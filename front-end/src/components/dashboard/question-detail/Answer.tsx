import React from "react";
import { Comment, Avatar, Tooltip, Modal } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";

import moment from "moment";
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetCurrentUserQuery,
} from "../../../generated/graphql";

import "./question-detail.css";

const Answer = ({ comment, setAllComments }) => {
  const [deleteCommentMutation] = useDeleteCommentMutation();
  const [editCommentMutation] = useEditCommentMutation();
  const currentUser = useGetCurrentUserQuery();

  const { author, message, createdAt } = comment;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);
  const [editableMessage, setEditableMessage] = React.useState(message);

  const creationDate = moment.unix(createdAt / 1000).format("L");

  const handleRemoveComment = async (commentId: string) => {
    await deleteCommentMutation({ variables: { id: commentId } });
    setAllComments(prev => prev.filter(c => c._id !== commentId));
  };

  const handleCancelOnDelete = () => {
    setIsDeleteModalOpen(false);
  };

  React.useEffect(() => {
    (async () => {
      if (editableMessage !== message) {
        setIsEditable(!isEditable);
        await editCommentMutation({
          variables: { id: comment._id, message: editableMessage },
        });
      }
    })();
  }, [editableMessage]);

  const getActionsForComment = () => {
    if (comment.author?._id === currentUser.data?.getCurrentUser?._id) {
      return [
        <span
          key="comment-delete"
          onClick={() => {
            Modal.confirm({
              content: "Are you sure you want to delete this comment?",
              onOk() {
                handleRemoveComment(comment._id);
              },
              okText: "Yes",
              centered: true,
              onCancel: handleCancelOnDelete,
              cancelText: "No",
              width: 450,
            });
          }}
        >
          Delete
        </span>,

        <span key="comment-edit" onClick={() => setIsEditable(true)}>
          Edit
        </span>,
      ];
    } else {
      return [];
    }
  };

  return (
    <Comment
      actions={getActionsForComment()}
      author={<a>{author.username}</a>}
      avatar={
        <Avatar
          src={
            author.avatarUrl
              ? author.avatarUrl
              : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          }
          alt={author.username}
        />
      }
      content={
        <Paragraph
          editable={{
            triggerType: ["text"],
            editing: isEditable,
            onChange: value => {
              setEditableMessage(value);
            },
          }}
        >
          {editableMessage}
        </Paragraph>
      }
      datetime={
        <Tooltip title={moment(creationDate).format("YYYY-MM-DD")}>
          <span>{moment(creationDate).fromNow()}</span>
        </Tooltip>
      }
    ></Comment>
  );
};

export default Answer;
