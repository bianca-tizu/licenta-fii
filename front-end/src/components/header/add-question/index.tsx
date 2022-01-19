import React from "react";

import { Form, Select, Button, Upload, Input, Tag } from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";

import Tags from "./Tags";

import "./add-question.css";
import { useCreateQuestionMutation } from "../../../generated/graphql";

const AddQuestion = ({ setIsQuestionVisible }: any) => {
  const [newQuestion, setNewQuestion] = React.useState({});

  const [createQuestion] = useCreateQuestionMutation();

  const handleDraftQuestion = (values: any) => {
    console.log("Draft triggered", values);
    setIsQuestionVisible(false);
  };

  const handlePostQuestion = async (values: Object) => {
    console.log("HANDLE POST", values);
    // const response = await createQuestion({
    //   questionDetails: {
    //     title: values.title,
    //   content: $content
    //   category: $category
    //   tags: $tags
    //   },
    // });
    //   variables: {
    //     sid: values.sid,
    //     email: values.email,
    //     password: values.password,
    //   },
    // });
    // console.log(response);
    // if (response.data?.register.errors) {
    //   setError(response.data?.register.errors.map(err => err.message)[0]);
    // }
    // if(response.data?.register.user) {
    //   setError({});
    //   setIsRegistered(false);
    // }
  };

  return (
    <Form name="validate_other" onFinish={handlePostQuestion}>
      {/* Category selection*/}
      <Form.Item
        name="select"
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
      <Tags />

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
