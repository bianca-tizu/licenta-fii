import React from "react";
import { Form, Button, Input, notification, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { createWorker } from "tesseract.js";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Tags from "./Tags";
import "./add-question.css";

import {
  Question,
  QuestionsDocument,
  useCreateQuestionMutation,
  useUpdateNotificationStatusMutation,
  useUpdateQuestionMutation,
} from "../../../generated/graphql";

import QuestionsContext from "../../../contexts/QuestionsProvider";

type CreateQuestionValuesType = {
  title: string;
  content: string;
};

const AddQuestion = ({
  setCreateQuestionLoading,
  setIsDraftVisible,
  setOcr,
  ocr,
  imageData,
  setImageData,
}: any) => {
  const [questionValues, setQuestionValues] = React.useState({
    title: "",
    content: "",
  });
  const [tags, setTags] = React.useState([]);
  const [error, setError] = React.useState("");

  const [updateNotification] = useUpdateNotificationStatusMutation();

  const [createQuestion] = useCreateQuestionMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: QuestionsDocument }],
    onCompleted(data) {
      if (!data.createQuestion?.question?.isDraft) {
        window.location.reload();
        if (data.createQuestion?.notifications?.length) {
          data.createQuestion.notifications.forEach(notif => {
            notification.info({
              message: notif,
              duration: 0,
              onClose: () => updateNotification(),
            });
          });
        }
      } else {
        setIsDraftVisible(true);
      }
    },
  });
  const [updateQuestion] = useUpdateQuestionMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: QuestionsDocument }],
    onCompleted(data) {
      if (!data.updateQuestion?.isDraft) {
        window.location.reload();
      } else {
        setIsDraftVisible(true);
      }
    },
  });

  const [createQuestionForm] = Form.useForm();

  let worker: any;

  const {
    addQuestion,
    setIsQuestionDialogVisible,
    isQuestionDialogVisible,
    selectedDraft,
  } = React.useContext(QuestionsContext);

  React.useEffect(() => {
    if (selectedDraft) {
      createQuestionForm.setFieldValue(
        "title",
        selectedDraft.title ? selectedDraft.title?.replace("[Draft] ", "") : ""
      );
      createQuestionForm.setFieldValue("content", selectedDraft?.content);
    } else {
      createQuestionForm.setFieldValue("title", "");
      createQuestionForm.setFieldValue("content", "");
    }
  }, [selectedDraft]);

  const convertImageToText = async () => {
    setCreateQuestionLoading(true);
    if (!imageData) {
      return;
    }

    try {
      worker = createWorker({
        logger: m => {
          console.log(m);
        },
      });

      await (await worker).load();
      await (await worker).loadLanguage("eng+ron");
      await (await worker).initialize("eng+ron");

      const { data } = await (await worker).recognize(imageData);
      setOcr(data.text);

      await (await worker).terminate();
      setCreateQuestionLoading(false);
    } catch (err) {
      console.log(err);
      throw new Error("Oops, there was a problem");
    }
  };

  const onImageChange = event => {
    if (!event.fileList[0]) {
      return;
    }

    convertImageToText();

    onFileReader(event.file);
  };

  const onFileReader = file => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImageData(fileReader.result);
    };
    fileReader.readAsDataURL(file.originFileObj);
  };

  const onChange = (_changedValue, allValues) => {
    setQuestionValues(allValues);
  };

  const handleDraftQuestion = async () => {
    handlePostQuestion(questionValues, true);
  };

  const handlePostQuestion = async (
    values: CreateQuestionValuesType,
    isDraft?: boolean
  ) => {
    setCreateQuestionLoading(true);

    try {
      const response = await createOrUpdateQuestion(
        values.title,
        values.content,
        isDraft
      );

      if (response.data) {
        addQuestion(response.data as Question);
        saveQuestion();
        setIsDraftVisible(isDraft);
      }
    } catch (e) {
      errorWhenSavingQuestion();
      notification["error"]({
        message: "Error",
        description: "Oops, there was a problem while saving the question",
        placement: "bottomRight",
      });
    }
  };

  const createOrUpdateQuestion = async (title, content, isDraft) => {
    if (selectedDraft) {
      return await updateQuestion({
        variables: {
          id: selectedDraft._id,
          title: title,
          content: content,
          tags: tags,
          isDraft: isDraft,
        },
      });
    } else {
      return await createQuestion({
        variables: {
          title: title,
          content: content,
          tags: tags,
          isDraft: isDraft,
        },
      });
    }
  };

  const saveQuestion = async () => {
    setIsQuestionDialogVisible({
      ...isQuestionDialogVisible,
      isVisible: false,
    });
    setError("");
    createQuestionForm.resetFields();
    setTags([]);
    setCreateQuestionLoading(false);
    setQuestionValues({
      title: "",
      content: "",
    });
    setOcr("");
    setImageData(undefined);
    await (await worker).terminate();
  };

  const errorWhenSavingQuestion = async () => {
    setIsQuestionDialogVisible({
      ...isQuestionDialogVisible,
      isVisible: false,
    });
    createQuestionForm.resetFields();
    setTags([]);
    setCreateQuestionLoading(false);
    setQuestionValues({
      title: "",
      content: "",
    });
    setOcr("");
    setImageData(undefined);
    await (await worker).terminate();
  };

  return (
    <Form
      form={createQuestionForm}
      name="createQuestion"
      onFinish={handlePostQuestion}
      onValuesChange={onChange}>
      {/* Title of the question */}
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please add a title" }]}>
        <Input placeholder="Insert your title" />
      </Form.Item>

      {/* Description of the question */}
      <Form.Item
        name="content"
        getValueFromEvent={(event: Event, editor: any) => {
          const data = editor.getData();
          return data;
        }}
        rules={[{ required: true, message: "Please add some context" }]}>
        <CKEditor
          editor={ClassicEditor}
          config={{
            removePlugins: [
              "Heading",
              "Indent",
              "ImageUpload",
              "BlockQuote",
              "Table",
              "MediaEmbed",
              "EasyImage",
            ],
          }}
          data={
            selectedDraft && ocr
              ? selectedDraft?.content + ocr
              : ocr
              ? ocr
              : selectedDraft
              ? selectedDraft?.content
              : ""
          }
          onReady={(editor: any) => {
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
          }}
          onChange={(event: Event, editor: any) => {
            const data = editor.getData();
            if (!data) {
              setImageData(undefined);
              setOcr("");
            }
            return data;
          }}
          error="Oh no"
        />
      </Form.Item>

      <Upload
        onChange={onImageChange}
        accept=".png, .jpg, .jpeg"
        showUploadList={false}>
        <Button icon={<UploadOutlined />} disabled={imageData}>
          Add text from image
        </Button>
      </Upload>

      {/* Tags */}
      <Tags tags={tags} setTags={setTags} />

      <div className="new-question-buttons">
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
          disabled={
            !createQuestionForm.getFieldValue("title") ||
            !createQuestionForm.getFieldValue("content")
          }>
          Publish
        </Button>
        <Button type="ghost" onClick={handleDraftQuestion}>
          Draft
        </Button>
      </div>
    </Form>
  );
};

export default AddQuestion;
