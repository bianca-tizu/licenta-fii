import React from "react";

import { Card, Avatar, Tag, Typography, Badge, Divider } from "antd";
import { CloseCircleOutlined, LikeOutlined } from "@ant-design/icons";

import "./question-detail.css";
import Answer from "./Answer";
import { Question } from "../../../generated/graphql";

const { Meta } = Card;
const { Paragraph } = Typography;

type Props = {
  selectedItem: Question;
  setSelectedItem: React.Dispatch<React.SetStateAction<Question | undefined>>;
  setCountLikes: React.Dispatch<React.SetStateAction<number>>;
  countLikes: number;
};

const QuestionDetail = ({
  selectedItem,
  setSelectedItem,
  setCountLikes,
  countLikes,
}: Props) => {
  return (
    <Card
      bordered={false}
      style={{ width: "90%", marginLeft: "30px" }}
      extra={[
        <CloseCircleOutlined
          key={selectedItem.id}
          onClick={() => setSelectedItem(undefined)}
        />,
      ]}
    >
      <div className="question-header">
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={selectedItem.title}
        />
        <div>
          <Badge count={countLikes} style={{ backgroundColor: "#3388CB" }} />
          <LikeOutlined
            key="vote"
            onClick={() => setCountLikes(countLikes + 1)}
          />
        </div>
      </div>

      <Paragraph style={{ margin: "10px 0" }}>{selectedItem.content}</Paragraph>
      {selectedItem.tags.map((tag) => (
        <Tag key={selectedItem.id}>{tag}</Tag>
      ))}
      <Divider />
      <Answer>
        <Answer></Answer>
      </Answer>
    </Card>
  );
};

export default QuestionDetail;
