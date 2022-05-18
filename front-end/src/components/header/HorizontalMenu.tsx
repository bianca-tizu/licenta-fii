import React from "react";

import { Badge, Menu, Spin } from "antd";
import {
  PlusCircleOutlined,
  UserOutlined,
  RadiusSettingOutlined,
  SearchOutlined,
  QuestionOutlined,
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
  const [createQuestionLoading, setCreateQuestionLoading] = React.useState(
    false
  );

  const handleClick = (event: any) => {
    switch (event.key) {
      case "questions":
        setIsDraftVisible(false);
        break;
      case "search":
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
    }
  };

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
      >
        {/* questions */}
        <Menu.Item
          key="questions"
          icon={<QuestionOutlined className="menu-item-icon" />}
          title="See questions"
        />

        {/* search  */}
        <Menu.Item
          key="search"
          title="Search"
          icon={<SearchOutlined className="menu-item-icon" />}
        />

        {/* add a question */}
        <Menu.Item
          key="newQuestion"
          title="Add a question"
          icon={<PlusCircleOutlined className="menu-item-icon" />}
        />
        <Modal
          title="Add a question"
          visible={isQuestionDialogVisible}
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

        {/* see drafts */}
        <>
          <Menu.Item
            key="drafts"
            icon={<RadiusSettingOutlined className="menu-item-icon" />}
            title="Draft questions"
          />
          <Badge
            dot
            style={{ position: "absolute", right: "20px", bottom: "5px" }}
          ></Badge>
        </>

        {/* user profile */}
        <Menu.Item
          key="profile"
          icon={<UserOutlined className="menu-item-icon" />}
          title="User profile"
        />
        <Modal
          // title="User profile"
          visible={isUserProfileVisible}
          keyboard
          maskClosable
          onCancel={() => setIsUserProfileVisible(false)}
          footer={null}
        >
          <UserProfile setIsUserProfileVisible={setIsUserProfileVisible} />
        </Modal>
      </Menu>
    </div>
  );
};

export default HorizontalMenu;
