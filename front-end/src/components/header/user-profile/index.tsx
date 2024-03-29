import { UserOutlined } from "@ant-design/icons";
import { Avatar, Form, Input, Image, Button, notification, Modal } from "antd";
import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import {
  useGetCurrentUserQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} from "../../../generated/graphql";

import "./user-profile.css";

const UserProfile = ({ setIsUserProfileVisible }: any) => {
  const { data, refetch } = useGetCurrentUserQuery({
    fetchPolicy: "cache-and-network",
  });
  const [updateUser] = useUpdateUserMutation();
  const [removeUserMutation] = useRemoveUserMutation();

  const [updateUserForm] = Form.useForm();

  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    _id: data?.getCurrentUser?._id || "",
    username: data?.getCurrentUser?.username || "",
    avatarUrl: data?.getCurrentUser?.avatarUrl || "",
    studentId: data?.getCurrentUser?.studentId || "",
    email: data?.getCurrentUser?.email || "",
    level: data?.getCurrentUser?.level || "",
  });

  const [cookies, removeCookie] = useCookies(["reward"]);

  React.useEffect(() => {
    refetch();

    setCurrentUser({
      _id: data?.getCurrentUser?._id || "",
      username: data?.getCurrentUser?.username || "",
      avatarUrl: data?.getCurrentUser?.avatarUrl || "",
      studentId: data?.getCurrentUser?.studentId || "",
      email: data?.getCurrentUser?.email || "",
      level: data?.getCurrentUser?.level || "",
    });
  }, [data?.getCurrentUser]);

  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);
  let history = useHistory();

  const handleUserChanges = async (values: any) => {
    Object.keys(values).forEach(value => {
      if (values[value] === undefined) {
        values[value] = "";
      }
    });

    try {
      const { username, password, email } = values;

      const response = await updateUser({
        variables: {
          username,
          password,
          email,
        },
      });

      if (response.data) {
        setIsUserProfileVisible(false);
        updateUserForm.resetFields();
        setCurrentUser(prev => ({
          ...prev,
          username: response.data?.updateUser?.username || "",
          email: response.data?.updateUser?.email || "",
        }));
      }
    } catch (error: any) {
      setIsUserProfileVisible(false);
      updateUserForm.resetFields();
      const errorDescription = error
        ? error.graphQLErrors[0].message
        : "Oops, there was a problem while updating your profile";
      notification["error"]({
        message: "Error",
        description: errorDescription,
        placement: "bottomRight",
      });
    }
  };

  const removeUser = async () => {
    await removeUserMutation();
    await sessionStorage.removeItem("token");
    await sessionStorage.removeItem("challenges");
    await sessionStorage.removeItem("timestamp");
    removeCookie("reward", null);
    history.push("/");
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Form
      form={updateUserForm}
      name="user-details"
      layout="vertical"
      onFinish={handleUserChanges}
      onFieldsChange={() => {
        setDisableSubmit(
          updateUserForm.getFieldsError().some(({ errors }) => errors.length)
        );
      }}>
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
            {cookies.reward && (
              <div className="reward-level">
                <p style={{ fontWeight: "bold", marginRight: "1px" }}>
                  LEVEL {currentUser.level}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Form.Item
        name="username"
        rules={[
          {
            validator(_, value) {
              if (!value || value !== currentUser.username) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Username already in use"));
            },
          },
        ]}>
        <Input placeholder="Display name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The e-mail is not valid",
          },
          {
            validator(_, value) {
              if (!value || value !== currentUser.email) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Email already in use"));
            },
          },
        ]}>
        <Input placeholder="E-mail" />
      </Form.Item>
      <hr />

      <p style={{ fontWeight: "bold" }}>CHANGE PASSWORD</p>
      <Form.Item
        name="password"
        tooltip="Your password should have minimum 1 lowercase character, 1 uppercase character and 1 number."
        rules={[
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
        ]}>
        <Input.Password placeholder="New password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
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
        ]}>
        <Input.Password placeholder="Re-enter new password" />
      </Form.Item>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Button
          type="text"
          style={{ paddingLeft: 0, color: "#139CE4" }}
          onClick={() => {
            Modal.confirm({
              content: "Are you sure you want to delete the account?",
              onOk: removeUser,
              okText: "Yes",
              centered: true,
              onCancel: handleCancel,
              cancelText: "No",
              width: 450,
            });
          }}>
          Delete account
        </Button>

        <Button type="primary" htmlType="submit" disabled={disableSubmit}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default UserProfile;
