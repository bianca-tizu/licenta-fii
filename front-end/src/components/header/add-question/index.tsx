import React from "react";

import {
  Form,
  Select,
  Button,
  Upload,
  Input,
  Tag
} from 'antd';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';

const AddQuestion = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return(
    <Form
      name="validate_other"
    >
      <Form.Item
        name="select"
        hasFeedback
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select placeholder="Please select a category">

        </Select>
      </Form.Item>

      <Form.Item 
        name="title"
        rules={[{required: true, message: "Please add a title for your question"}]}
      >
        <Input placeholder="Insert your title"/>
      </Form.Item>

      <Form.Item rules={[{required: true, message: "Please add context for your question"}]}>
        <Input.TextArea placeholder="Include all the information someone would need to answer your question" showCount maxLength={1000}/>
      </Form.Item>

      <Form.Item>
        <Form.Item name="dragger" valuePropName="fileList" noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default AddQuestion;