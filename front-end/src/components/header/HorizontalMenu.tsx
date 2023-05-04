import React from "react";
import { useHistory } from "react-router-dom";

import { Menu, Spin } from "antd";
import {
  PlusCircleOutlined,
  UserOutlined,
  RadiusSettingOutlined,
  SearchOutlined,
  QuestionOutlined,
  LogoutOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

import QuestionsContext from "../../contexts/QuestionsProvider";

import AddQuestion from "./add-question";
import UserProfile from "./user-profile";
import RewardSystem from "./reward-system";

import "./menu.css";
import { useCookies } from "react-cookie";
import { useRemoveNotificationsMutation } from "../../generated/graphql";

const HorizontalMenu = ({
  isSearchVisible,
  setIsSearchVisible,
  setIsDraftVisible,
  setOpenTutorial,
}: any) => {
  const [isUserProfileVisible, setIsUserProfileVisible] = React.useState(false);
  const [isRewardSystemVisible, setIsRewardSystemVisible] =
    React.useState(false);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] =
    React.useState(false);
  const [createQuestionLoading, setCreateQuestionLoading] =
    React.useState(false);
  const [ocr, setOcr] = React.useState("");
  const [imageData, setImageData] = React.useState<any>();

  const {
    isQuestionDialogVisible,
    setIsQuestionDialogVisible,
    setSelectedQuestion,
    setSelectedDraft,
    setSearchResults,
  } = React.useContext(QuestionsContext);

  const [removeNotifications] = useRemoveNotificationsMutation();

  let history = useHistory();
  const [cookies] = useCookies(["reward"]);
  const handleLogout = async () => {
    await removeNotifications();
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
        setIsQuestionDialogVisible({
          ...isQuestionDialogVisible,
          isVisible: !isQuestionDialogVisible.isVisible,
        });
        setIsSearchVisible(false);
        setSearchResults("");
        break;
      case "drafts":
        setIsDraftVisible(true);
        setIsSearchVisible(false);
        setSelectedQuestion(undefined);
        setSearchResults("");
        break;
      case "profile":
        setIsUserProfileVisible(!isUserProfileVisible);
        setIsSearchVisible(false);
        setSearchResults("");
        break;
      case "rewards":
        setIsRewardSystemVisible(!isRewardSystemVisible);
        setIsSearchVisible(false);
        setSelectedQuestion(undefined);
        setSearchResults("");
        break;
      case "logout":
        setIsLogoutDialogVisible(!isLogoutDialogVisible);
        setIsSearchVisible(false);
        setSearchResults("");
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
      key: "rewards",
      icon: <GiftOutlined className="menu-item-icon" />,
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
      }}>
      <Menu
        onClick={handleClick}
        mode="horizontal"
        theme="dark"
        className="menu"
        style={{
          background: "inherit",
          color: "#fff",
        }}
        defaultSelectedKeys={["questions"]}
        items={items}
      />

      {/* add a question */}
      <Modal
        title={
          isQuestionDialogVisible.action === "edit"
            ? "Edit question"
            : "Add question"
        }
        open={isQuestionDialogVisible.isVisible}
        keyboard
        maskClosable
        onCancel={() => {
          setIsQuestionDialogVisible({ isVisible: false, action: "add" });
          setSelectedDraft(undefined);
          setOcr("");
          setImageData(null);
        }}
        footer={null}>
        <Spin spinning={createQuestionLoading}>
          <AddQuestion
            imageData={imageData}
            setImageData={setImageData}
            setIsDraftVisible={setIsDraftVisible}
            setCreateQuestionLoading={setCreateQuestionLoading}
            setOcr={setOcr}
            ocr={ocr}
          />
        </Spin>
      </Modal>

      {/* Reward system */}
      <Modal
        className={cookies.reward ? "" : "reward-system-modal"}
        open={isRewardSystemVisible}
        keyboard
        centered
        maskClosable
        onCancel={() => setIsRewardSystemVisible(false)}
        footer={null}>
        <RewardSystem
          setOpenTutorial={setOpenTutorial}
          setIsRewardSystemVisible={setIsRewardSystemVisible}
        />
      </Modal>

      {/* user profile */}
      <Modal
        open={isUserProfileVisible}
        keyboard
        maskClosable
        onCancel={() => setIsUserProfileVisible(false)}
        footer={null}>
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
        onOk={handleLogout}>
        Are you sure you want to log out?
      </Modal>
    </div>
  );
};

export default HorizontalMenu;
