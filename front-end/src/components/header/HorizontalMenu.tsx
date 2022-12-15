import React from "react";
import { useHistory } from "react-router-dom";

import { Badge, Menu, Spin } from "antd";
import {
  PlusCircleOutlined,
  UserOutlined,
  RadiusSettingOutlined,
  SearchOutlined,
  QuestionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

import AddQuestion from "./add-question";
import UserProfile from "./user-profile";

import "./menu.css";

const HorizontalMenu = ({
  isSearchVisible,
  setIsSearchVisible,
  isDraftVisible,
  setIsDraftVisible,
}: any) => {
  const [isQuestionDialogVisible, setIsQuestionDialogVisible] = React.useState(
    false
  );
  const [isUserProfileVisible, setIsUserProfileVisible] = React.useState(false);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = React.useState(
    false
  );
  const [createQuestionLoading, setCreateQuestionLoading] = React.useState(
    false
  );

  let history = useHistory();

  const handleLogout = async () => {
    await sessionStorage.removeItem("token");
    history.push("/");
  };

  const handleClick = (event: any) => {
    switch (event.key) {
      case "questions":
        setIsDraftVisible(false);
        break;
      case "search":
        setIsDraftVisible(false);
        setIsSearchVisible(!isSearchVisible);
        break;
      case "newQuestion":
        setIsQuestionDialogVisible(!isQuestionDialogVisible);
        setIsSearchVisible(false);
        break;
      case "drafts":
        setIsDraftVisible(true);
        setIsSearchVisible(false);
        break;
      case "profile":
        setIsUserProfileVisible(!isUserProfileVisible);
        setIsSearchVisible(false);
        break;
      case "logout":
        setIsLogoutDialogVisible(!isLogoutDialogVisible);
        setIsSearchVisible(false);
        break;
    }
  };

  const items = [
    {
      key: "questions",
      icon: <QuestionOutlined className="menu-item-icon" />,
    },
    {
      key: "search",
      icon: <SearchOutlined className="menu-item-icon" />,
    },
    {
      key: "newQuestion",
      icon: <PlusCircleOutlined className="menu-item-icon" />,
    },
    {
      key: "drafts",
      icon: <RadiusSettingOutlined className="menu-item-icon" />,
    },
    {
      key: "profile",
      icon: <UserOutlined className="menu-item-icon" />,
    },
    {
      key: "logout",
      icon: <LogoutOutlined className="menu-item-icon" />,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Menu
        onClick={handleClick}
        mode="horizontal"
        theme="dark"
        style={{
          background: "inherit",
          color: "#fff",
        }}
        defaultSelectedKeys={["questions"]}
        items={items}
      />

      {/* add a question */}
      <Modal
        title="Add a question"
        open={isQuestionDialogVisible}
        keyboard
        maskClosable
        onCancel={() => setIsQuestionDialogVisible(false)}
        footer={null}
      >
        <Spin spinning={createQuestionLoading}>
          <AddQuestion
            setIsDraftVisible={setIsDraftVisible}
            setIsQuestionDialogVisible={setIsQuestionDialogVisible}
            setCreateQuestionLoading={setCreateQuestionLoading}
          />
        </Spin>
      </Modal>

      {/* user profile */}
      <Modal
        open={isUserProfileVisible}
        keyboard
        maskClosable
        onCancel={() => setIsUserProfileVisible(false)}
        footer={null}
      >
        <UserProfile setIsUserProfileVisible={setIsUserProfileVisible} />
      </Modal>

      {/* Logout dialog */}
      <Modal
        open={isLogoutDialogVisible}
        keyboard
        maskClosable
        onCancel={() => setIsLogoutDialogVisible(false)}
        okText="Yes"
        cancelText="No"
        onOk={handleLogout}
      >
        Are you sure you want to log out?
      </Modal>
    </div>
  );
};

export default HorizontalMenu;
