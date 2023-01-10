import React from "react";
import { Comment, Avatar, Tooltip } from "antd";

import moment from "moment";

const Answer = ({ comment }) => {
  const { author, message, createdAt } = comment;
  const creationDate = moment.unix(createdAt / 1000).format("L");
  console.log(creationDate);
  return (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
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
