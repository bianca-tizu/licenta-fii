import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";

import React from "react";
import { useHistory } from "react-router";

import { useLoginMutation } from "../../../generated/graphql";

import "./login.css";

const { Title, Text } = Typography;

const LoginForm = () => {
  const [login] = useLoginMutation();
  const [error, setError] = React.useState("");

  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      setError("");

      const response = await login({
        variables: { email: values.email, password: values.password },
      });

      if (response.data?.loginUser.token) {
        sessionStorage.setItem("token", response.data.loginUser.token);
        history.push("/dashboard");
      } else if (!response.data?.loginUser.token) {
        history.push("/");
      }
    } catch (err: any) {
      setError(err.message);
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
      {error && (
        <p style={{ color: "red" }}>
          <LoginOutlined style={{ color: "#ff0000", marginRight: "5px" }} />
          {error}
        </p>
      )}
      <Text type="secondary">Please log in to your account.</Text>
      <Form.Item
        name="email"
        className="username-input"
        rules={[{ required: true, message: "Please enter an email" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter a password" }]}
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
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
