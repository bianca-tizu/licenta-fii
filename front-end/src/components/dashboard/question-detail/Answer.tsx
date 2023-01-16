import React from "react";
import { Comment, Avatar, Tooltip, Modal } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";

import { format, formatDistanceToNow } from "date-fns";

import {
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetCurrentUserQuery,
} from "../../../generated/graphql";

import "./question-detail.css";

const Answer = ({ comment, setAllComments }) => {
  const [deleteCommentMutation] = useDeleteCommentMutation();
  const [editCommentMutation] = useEditCommentMutation();
  const currentUser = useGetCurrentUserQuery({ fetchPolicy: "network-only" });

  const { author, message, createdAt } = comment;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);

  const handleRemoveComment = async (commentId: string) => {
    await deleteCommentMutation({ variables: { id: commentId } });
    setAllComments(prev => prev.filter(c => c._id.toString() !== commentId));
  };

  const handleCancelOnDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleChange = async changedMessage => {
    setIsEditable(!isEditable);
    await editCommentMutation({
      variables: { id: comment._id, message: changedMessage },
    });
  };

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
            onChange: handleChange,
          }}
        >
          {message}
        </Paragraph>
      }
      datetime={
        <Tooltip title={format(parseInt(createdAt, 10), "dd/MM/yyyy")}>
          <span>{formatDistanceToNow(parseInt(createdAt, 10))}</span>
        </Tooltip>
      }
    ></Comment>
  );
};

export default Answer;
