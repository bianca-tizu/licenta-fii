import React from "react";

import { Form, Select, Button, Upload, Input, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";

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
        rules={[{ required: true, message: "Please add some context" }]}
      >
        <Input.TextArea
          placeholder="Include all the information someone would need to answer your question"
          showCount
          maxLength={1000}
        />
      </Form.Item>

      {/* Additional files */}
      <Form.Item>
        <Form.Item name="dragger" valuePropName="fileList" noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
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
