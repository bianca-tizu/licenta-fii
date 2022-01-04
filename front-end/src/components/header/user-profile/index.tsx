import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useState } from "react";

const UserProfile = () => {
  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div className="usericon">
      <Avatar
        style={{ backgroundColor: `#${randomColor()}` }}
        icon={<UserOutlined />}
        size={60}
      />
      <p className="username">USERNAME</p>
    </div>
  );
};

export default UserProfile;
