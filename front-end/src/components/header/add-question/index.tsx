import React from "react";

import { Form, Select, Button, Upload, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import Tags from "./Tags";

import "./add-question.css";
import { useCreateQuestionMutation } from "../../../generated/graphql";

type CreateQuestionValuesType = {
  title: string;
  category: string;
  description: string;
};

const AddQuestion = ({ setIsQuestionVisible }: any) => {
  const [newQuestion, setNewQuestion] = React.useState({});
  const [tags, setTags] = React.useState([]);
  const [error, setError] = React.useState("");

  const [createQuestion] = useCreateQuestionMutation();

  const [createQuestionForm] = Form.useForm();

  const handleDraftQuestion = (values: any) => {
    console.log("Draft triggered", values);
    setIsQuestionVisible(false);
  };

  const handlePostQuestion = async (values: CreateQuestionValuesType) => {
    console.log("HANDLE POST", values, tags);
    try {
      const { title, category, description } = values;
      const response = await createQuestion({
        variables: {
          title: title,
          content: description,
          category: category,
          tags: tags,
        },
      });

      console.log(response);

      if (response.data) {
        setIsQuestionVisible(false);
        setError("");
        createQuestionForm.resetFields();
      }
    } catch (e) {
      setIsQuestionVisible(false);
      setError("Oops, there was a problem!");
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
        rules={[
          { required: true, message: "Please add a title for your question" },
        ]}
      >
        <Input placeholder="Insert your title" />
      </Form.Item>

      {/* Description of the question */}
      <Form.Item
        name="description"
        rules={[
          { required: true, message: "Please add context for your question" },
        ]}
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
          Submit
        </Button>
        <Button type="dashed" htmlType="button" onClick={handleDraftQuestion}>
          Draft
        </Button>
      </div>
    </Form>
  );
};

export default AddQuestion;
