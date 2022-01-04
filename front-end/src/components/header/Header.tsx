import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Button, Menu, Layout } from "antd";
import {
  PlusCircleOutlined,
  UserOutlined,
  RadiusSettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

import AddQuestion from "./add-question";
import UserProfile from "./user-profile";

const useStyles = makeStyles(() => ({
  backgroundHeader: {
    backgroundColor: "#fff",
  },
  headerLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);
  const [draft, setDraft] = useState("");

  const handleDraft = (values: any) => {
    console.log("Draft triggered", values);
    setIsQuestionVisible(false);
  };

  const handleSaveProfile = (values: any) => {
    console.log("Save profile", values);
    setIsUserProfileVisible(false);
  };

  const handlePost = async (values: any) => {
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
    <div>
      {/* <AppBar className={classes.backgroundHeader}> */}
      {/* <Layout className={classes.backgroundHeader}> */}
      <Menu mode="vertical" className={classes.headerLayout}>
        <Menu.Item key="title">
          <Typography variant="h6"> FII Talks </Typography>
        </Menu.Item>
        <Menu.Item
          key="search"
          icon={<SearchOutlined style={{ fontSize: "30px" }} />}
        />
        <Menu.Item
          key="newQuestion"
          icon={<PlusCircleOutlined style={{ fontSize: "30px" }} />}
          onClick={() => setIsQuestionVisible(true)}
        />
        <Modal
          title="Add a question"
          visible={isQuestionVisible}
          keyboard
          maskClosable
          onCancel={() => setIsQuestionVisible(false)}
          footer={[
            <Button key="post" type="primary" onClick={handlePost}>
              Post
            </Button>,
            <Button key="draft" type="dashed" onClick={handleDraft}>
              Save draft
            </Button>,
          ]}
        >
          <AddQuestion />
        </Modal>
        <Menu.Item
          key="drafts"
          icon={<RadiusSettingOutlined style={{ fontSize: "30px" }} />}
        />
        <Menu.Item
          key="profile"
          icon={<UserOutlined style={{ fontSize: "30px" }} />}
          onClick={() => setIsUserProfileVisible(true)}
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
      {/* </Layout> */}
      {/* </AppBar> */}
    </div>
  );
};

export default Header;
