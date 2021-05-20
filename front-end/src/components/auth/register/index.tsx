import React from 'react';
import { Form, Input, Button } from 'antd';
import { useMutation } from 'urql';

const REGISTER_MUTATION = `mutation Register($sid: String!, $email: String!, $password:String!){
  register(
    studentId: $sid
    input: { email: $email, password: $password }
  ) {
    errors {
      field
      message
    }
    user {
      email
      createdAt
      updatedAt
      studentId
      username
    }
  }
}
`
const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [,register] = useMutation(REGISTER_MUTATION);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    return register(values)
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      layout="vertical"
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="sid"
        label="SID"
        tooltip="Please enter your student identification number"
        rules={[
          {
            required: true,
            message: 'Please input your student identification number!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;