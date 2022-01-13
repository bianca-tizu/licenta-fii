import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography, Form, Input } from "antd";
import React, { useState } from "react";

import "./user-profile.css";

const { Text, Paragraph } = Typography;

const UserProfile = () => {
  const [editableEmail, setEditableEmail] = React.useState("test@test.com");
  const [editableName, setEditableName] = React.useState("User name");
  const [newPassword, setNewPassword] = React.useState("");
  const [enterNewPassword, setEnterNewPassword] = React.useState("");
  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  return (
    <>
      <div className="user-details">
        <div className="user-icon">
          <Avatar
            style={{
              backgroundColor: `#${randomColor()}`,
              marginBottom: "10px",
            }}
            icon={<UserOutlined />}
            size={60}
          />
          <div className="fixed-details">
            <p className="username">USERNAME</p>
            <p className="student-id">012345678910</p>
          </div>
        </div>
      </div>
      <Form name="user-details" layout="vertical">
        <Form.Item name={["user", "name"]} label="Name">
          <Input value={editableName} />
        </Form.Item>
        <Form.Item name={["user", "mail"]} label="E-mail">
          <Input value={editableEmail} />
        </Form.Item>
      </Form>
      <hr />
      <p style={{ fontWeight: "bold" }}>PASSWORD</p>
      <Form name="change-password" layout="vertical">
        <Form.Item name={["change", "pass"]} label="New password">
          <Input value={newPassword} />
        </Form.Item>
        <Form.Item name={["re-enter", "pass"]} label="Re-enter new password">
          <Input value={enterNewPassword} />
        </Form.Item>
      </Form>
    </>
  );
};

export default UserProfile;
