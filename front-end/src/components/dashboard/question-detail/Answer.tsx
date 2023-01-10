import React from "react";
import { Comment, Avatar, Tooltip } from "antd";

import moment from "moment";
import {
  useDeleteCommentMutation,
  useGetCurrentUserQuery,
} from "../../../generated/graphql";

const Answer = ({ comment, setAllComments }) => {
  const [deleteCommentMutation] = useDeleteCommentMutation();
  const currentUser = useGetCurrentUserQuery();

  const { author, message, createdAt } = comment;
  const creationDate = moment.unix(createdAt / 1000).format("L");

  const handleRemoveComment = async (commentId: string) => {
    await deleteCommentMutation({ variables: { id: commentId } });
    setAllComments(prev => prev.filter(c => c._id !== commentId));
  };

  const handleEditComment = (commentId: string) => {};

  const getActionsForComment = () => {
    if (comment.author?._id === currentUser.data?.getCurrentUser?._id) {
      return [
        <span
          key="comment-delete"
          onClick={() => handleRemoveComment(comment._id)}
        >
          Delete
        </span>,

        <span key="comment-edit" onClick={() => handleEditComment(comment._id)}>
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
      content={<p>{message}</p>}
      datetime={
        <Tooltip title={moment(creationDate).format("YYYY-MM-DD")}>
          <span>{moment(creationDate).fromNow()}</span>
        </Tooltip>
      }
    >
      {/* {children} */}
    </Comment>
  );
};

export default Answer;
