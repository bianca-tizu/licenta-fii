import React from "react";

import { Button, Menu } from "antd";
import {
  PlusCircleOutlined,
  UserOutlined,
  RadiusSettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

import AddQuestion from "./add-question";
import UserProfile from "./user-profile";

import "./menu.css";

const HorizontalMenu = ({ isSearchVisible, setIsSearchVisible }: any) => {
  const [isQuestionVisible, setIsQuestionVisible] = React.useState(false);
  const [isUserProfileVisible, setIsUserProfileVisible] = React.useState(false);
  const [isDraftVisible, setIsDraftVisible] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  const handleDraftQuestion = (values: any) => {
    console.log("Draft triggered", values);
    setIsQuestionVisible(false);
  };

  const handleSaveProfile = (values: any) => {
    console.log("Save profile", values);
    setIsUserProfileVisible(false);
  };

  const handleClick = (event: any) => {
    console.log("Menu event", event);
    switch (event.key) {
      case "search":
        setIsSearchVisible(!isSearchVisible);
        console.log("");
        break;
      case "newQuestion":
        setIsQuestionVisible(!isQuestionVisible);
        setIsSearchVisible(false);
        break;
      case "drafts":
        setIsDraftVisible(!isDraftVisible);
        setIsSearchVisible(false);
        break;
      case "profile":
        setIsUserProfileVisible(!isUserProfileVisible);
        setIsSearchVisible(false);
        break;
    }
  };

  const handlePostQuestion = async (values: any) => {
    console.log("HANDLE POST", values);
    // const response = await createQuestion({
    //   variables: {
    //     sid: values.sid,
    //     email: values.email,
    //     password: values.password,
    //   },
    // });
    // console.log(response);
    // if (response.data?.register.errors) {
    //   setError(response.data?.register.errors.map(err => err.message)[0]);
    // }
    // if(response.data?.register.user) {
    //   setError({});
    //   setIsRegistered(false);
    // }
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
          visible={isQuestionVisible}
          keyboard
          maskClosable
          onCancel={() => setIsQuestionVisible(false)}
          footer={[
            <Button key="post" type="primary" onClick={handlePostQuestion}>
              Post
            </Button>,
            <Button key="draft" type="dashed" onClick={handleDraftQuestion}>
              Save draft
            </Button>,
          ]}
        >
          <AddQuestion />
        </Modal>

        {/* see drafts */}
        <Menu.Item
          key="drafts"
          icon={<RadiusSettingOutlined className="menu-item-icon" />}
          title="Draft questions"
        />

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
          footer={[
            <Button key="post" type="primary" onClick={handleSaveProfile}>
              Save
            </Button>,
          ]}
        >
          <UserProfile />
        </Modal>
      </Menu>
    </div>
  );
};

export default HorizontalMenu;
