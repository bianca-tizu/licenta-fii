import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./login.css";

import { useLoginMutation } from "../../../generated/graphql";
import React from "react";
import { useHistory } from "react-router";

const { Title, Text } = Typography;

const LoginForm = () => {
  const [login] = useLoginMutation();
  const [error, setError] = React.useState({});

  const history = useHistory();
  console.log(login);

  const onFinish = async (values: any) => {
    const response = await login({
      variables: { email: values.email, password: values.password },
    });

    if (response.data?.login) {
      // setError({});
      history.push("/dashboard");
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={3}>Welcome back!</Title>
      <Text type="secondary">Please log in to your account.</Text>
      <Form.Item
        name="email"
        className="username-input"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item className="login-form-action">
        <Button htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* {error === "Incorrect password" && (
          <p style={{ color: "red", marginTop: "10px" }}>Wrong password</p>
        )}
        {error === "Incorrect e-mail" && (
          <p style={{ color: "red", marginTop: "10px" }}>Wrong e-mail</p>
        )} */}
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
