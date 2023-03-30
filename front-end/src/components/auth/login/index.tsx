import { Form, Input, Button, Typography, Modal, notification } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";

import React from "react";
import { useHistory } from "react-router";

import {
  useForgetPasswordMutation,
  useLoginMutation,
} from "../../../generated/graphql";

import "./login.css";
import { useCookies } from "react-cookie";

const { Title, Text } = Typography;

const LoginForm = () => {
  const [login] = useLoginMutation();
  const [forgetPassword] = useForgetPasswordMutation();
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [showResetPasswordModal, setShowResetPasswordModal] =
    React.useState(false);
  const [_cookies, setCookie] = useCookies();

  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      setError("");

      const response = await login({
        variables: { email: values.email, password: values.password },
      });

      if (response.data?.loginUser.token) {
        sessionStorage.setItem("token", response.data.loginUser.token);
        sessionStorage.setItem(
          "timestamp",
          response.data.loginUser.user.loginTimestamp
        );
        sessionStorage.setItem(
          "challenges",
          response.data.loginUser.user.challengesChecked.toString()
        );
        history.push("/dashboard");
        if (response.data.loginUser.user.joinedRewardSystem) {
          setCookie("reward", response.data.loginUser.user.joinedRewardSystem);
        }
      } else if (!response.data?.loginUser.token) {
        history.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetPassword = async () => {
    try {
      setError("");
      const response = await forgetPassword({
        variables: { email: email },
      });

      if (response.data?.forgetPassword.resetPassToken) {
        setEmail("");
        setShowResetPasswordModal(false);
        notification["info"]({
          key: "",
          message: "",
          description: "We have sent you a password recovery mail.",
        });
        //show code input and set new password
      }
    } catch (err: any) {
      setError(err.message);
      setShowResetPasswordModal(false);
      setEmail("");
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}>
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
        rules={[{ required: true, message: "Please enter an email" }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="E-mail address"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter a password" }]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item noStyle>
        <Text
          style={{ color: "#1890FF", cursor: "pointer" }}
          onClick={() => setShowResetPasswordModal(!showResetPasswordModal)}>
          Forgot password
        </Text>
        <Modal
          title="Reset your password"
          centered
          open={showResetPasswordModal}
          okText="Send"
          onOk={resetPassword}
          onCancel={() => {
            setShowResetPasswordModal(false);
            setEmail("");
          }}>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
        </Modal>
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
