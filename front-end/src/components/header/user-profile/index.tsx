import { UserOutlined } from "@ant-design/icons";
import { Avatar, Form, Input, Image, Button } from "antd";
import React from "react";
import { useGetCurrentUserQuery } from "../../../generated/graphql";

import "./user-profile.css";

const UserProfile = ({ setIsUserProfileVisible }: any) => {
  const { data, error } = useGetCurrentUserQuery();

  const currentUser = {
    _id: data?.getCurrentUser?._id || "",
    username: data?.getCurrentUser?.username || "",
    avatarUrl: data?.getCurrentUser?.avatarUrl || "",
    studentId: data?.getCurrentUser?.studentId || "",
    email: data?.getCurrentUser?.email || "",
  };
  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  const [editableEmail, setEditableEmail] = React.useState(currentUser.email);
  const [editableName, setEditableName] = React.useState(currentUser.username);
  const [newPassword, setNewPassword] = React.useState("");
  const [enterNewPassword, setEnterNewPassword] = React.useState("");

  const handleUserChanges = (values: any) => {
    setIsUserProfileVisible(false);
    console.log(values);
  };

  return (
    <>
      <div className="user-details">
        <div className="user-icon">
          <Avatar
            src={<Image src={currentUser.avatarUrl} />}
            style={{
              backgroundColor: `#${randomColor()}`,
              marginBottom: "10px",
            }}
            icon={<UserOutlined />}
            size={60}
          />
          <div className="fixed-details">
            <p className="username">{currentUser.username}</p>
            <p className="student-id">{currentUser.studentId}</p>
          </div>
        </div>
      </div>
      <Form name="user-details" layout="vertical" onFinish={handleUserChanges}>
        <Form.Item name={["user", "name"]} label="Display name">
          <Input value={editableName} onChange={() => setEditableName} />
        </Form.Item>
        <Form.Item name={["user", "mail"]} label="E-mail">
          <Input value={editableEmail} onChange={() => setEditableEmail} />
        </Form.Item>
      </Form>
      <hr />

      <p style={{ fontWeight: "bold" }}>PASSWORD</p>
      <Form name="change-password" layout="vertical">
        <Form.Item name={["change", "pass"]} label="New password">
          <Input.Password value={newPassword} onChange={() => setNewPassword} />
        </Form.Item>
        <Form.Item name={["re-enter", "pass"]} label="Re-enter new password">
          <Input.Password
            value={enterNewPassword}
            onChange={() => setEnterNewPassword}
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginRight: "10px",
            }}
          >
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UserProfile;
