import React from "react";
import { Form, Select, Button, Input, notification } from "antd";

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
  category: string;
  content: string;
};

const AddQuestion = ({
  setIsQuestionVisible,
  setCreateQuestionLoading,
}: any) => {
  const [newQuestion, setNewQuestion] = React.useState({});
  const [tags, setTags] = React.useState([]);
  const [error, setError] = React.useState("");

  const [createQuestion] = useCreateQuestionMutation();

  const [createQuestionForm] = Form.useForm();

  const { addQuestion } = React.useContext(QuestionsContext);

  const handleDraftQuestion = (values: any) => {
    console.log("Draft triggered", values);
    // setCreateQuestionLoading(true);
    setIsQuestionVisible(false);
  };

  const handlePostQuestion = async (values: CreateQuestionValuesType) => {
    setCreateQuestionLoading(true);

    try {
      const { title, category, content } = values;
      const response = await createQuestion({
        variables: {
          title: title,
          content: content,
          category: category,
          tags: tags,
          isDraft: false,
        },
      });

      console.log(response);

      if (response.data) {
        addQuestion(response.data.createQuestion as Question);
        setIsQuestionVisible(false);
        setError("");
        createQuestionForm.resetFields();
        setTags([]);
        setCreateQuestionLoading(false);
      }
    } catch (e) {
      setIsQuestionVisible(false);
      createQuestionForm.resetFields();
      setTags([]);
      notification["error"]({
        message: "Error",
        description: "Oops, there was a problem creating the question",
        placement: "bottomRight",
      });
      setCreateQuestionLoading(false);
    }
  };

  return (
    <Form
      form={createQuestionForm}
      name="createQuestion"
      onFinish={handlePostQuestion}
    >
      {/* Category selection*/}
      <Form.Item
        name="category"
        hasFeedback
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Please select a category">
          <Select.Option value="jack">Jack</Select.Option>
          <Select.Option value="lucy">Lucy</Select.Option>
        </Select>
      </Form.Item>

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
        valuePropName="data"
        getValueFromEvent={(event: Event, editor: any) => {
          const data = editor.getData();
          return data;
        }}
        rules={[{ required: true, message: "Please add some context" }]}
      >
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor: any) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event: Event, editor: any) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
        />
      </Form.Item>

      {/* Tags */}
      <Tags tags={tags} setTags={setTags} />

      <div className="new-question-buttons">
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
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
