import React from "react";
import { Form, Button, Input, notification } from "antd";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Tags from "./Tags";
import "./add-question.css";

import {
  Question,
  useCreateQuestionMutation,
} from "../../../generated/graphql";
import QuestionsContext from "../../../contexts/QuestionsProvider";

type CreateQuestionValuesType = {
  title: string;
  content: string;
};

const AddQuestion = ({
  setIsQuestionDialogVisible,
  setCreateQuestionLoading,
  setIsDraftVisible,
}: any) => {
  const [questionValues, setQuestionValues] = React.useState({
    title: "",
    content: "",
  });
  const [tags, setTags] = React.useState([]);
  const [error, setError] = React.useState("");

  const [createQuestion] = useCreateQuestionMutation();

  const [createQuestionForm] = Form.useForm();

  const { addQuestion } = React.useContext(QuestionsContext);

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
      const { title, content } = values;
      const response = await createQuestion({
        variables: {
          title: title,
          content: content,
          tags: tags,
          isDraft: isDraft,
        },
      });

      if (response.data) {
        addQuestion(response.data.createQuestion as Question);
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

  const saveQuestion = () => {
    setIsQuestionDialogVisible(false);
    setError("");
    createQuestionForm.resetFields();
    setTags([]);
    setCreateQuestionLoading(false);
    setQuestionValues({
      title: "",
      content: "",
    });
  };

  const errorWhenSavingQuestion = () => {
    setIsQuestionDialogVisible(false);
    createQuestionForm.resetFields();
    setTags([]);
    setCreateQuestionLoading(false);
    setQuestionValues({
      title: "",
      content: "",
    });
  };

  return (
    <Form
      form={createQuestionForm}
      name="createQuestion"
      onFinish={handlePostQuestion}
      onValuesChange={onChange}
    >
      {/* Title of the question */}
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please add a title" }]}
      >
        <Input placeholder="Insert your title" />
      </Form.Item>

      {/* Description of the question */}
      <Form.Item
        name="content"
        getValueFromEvent={(event: Event, editor: any) => {
          const data = editor.getData();
          return data;
        }}
        rules={[{ required: true, message: "Please add some context" }]}
      >
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
          data=""
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
            return data;
          }}
          error="Oh no"
        />
      </Form.Item>

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
          }
        >
          Publish
        </Button>
        <Button type="dashed" htmlType="button" onClick={handleDraftQuestion}>
          Draft
        </Button>
      </div>
    </Form>
  );
};

export default AddQuestion;
