import React from "react";
import { Form, Input, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

import { useRegisterMutation } from "../../generated/graphql";

type RegistrationFormProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setIsRegistered,
}) => {
  const [form] = Form.useForm();
  const [register] = useRegisterMutation();
  const [error, setError] = React.useState("");

  const onFinish = async (values: any) => {
    try {
      const response = await register({
        variables: {
          sid: values.sid,
          email: values.email,
          password: values.password,
        },
      });
      if (response) {
        setError("");
        setIsRegistered(false);
      }
    } catch (err: any) {
      setError(err.message);
    }
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
            type: "email",
            message: "The e-mail is not valid",
          },
          {
            required: true,
            message: "Please enter an e-mail",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        tooltip="Your password should have minimum 1 lowercase character, 1 uppercase character and 1 number."
        rules={[
          {
            required: true,
            message: "Please enter a password",
          },
          {
            validator(_, value) {
              if (
                !value ||
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(value)
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The entered password should be stronger!")
              );
            },
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm the password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords do not match!")
              );
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
            message: "Please enter your student Id number",
            whitespace: true,
          },
          {
            validator(_, value) {
              if (!value || value.length > 15) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Student id is not valid!"));
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            <LoginOutlined style={{ color: "#ff0000", marginRight: "5px" }} />
            {error}
          </p>
        )}
        <p style={{ marginTop: "10px" }}>
          You already have an account? Login{" "}
          <span
            className="registerNavigate"
            role="button"
            onClick={() => {
              setIsRegistered(false);
            }}
          >
            HERE
          </span>
          !
        </p>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
