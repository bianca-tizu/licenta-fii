import React from "react";

import { Card, Avatar, Badge } from "antd";
import { SendOutlined, LikeOutlined } from "@ant-design/icons";

import QuestionDetail from "../question-detail";

import "../dashboard.css";

const { Meta } = Card;

const defaultQuestions = [
  { id: 1, selected: false },
  { id: 2, selected: false },
  { id: 3, selected: false },
  { id: 4, selected: false },
];

const QuestionsList = () => {
  const [countLikes, setCountLikes] = React.useState(0);
  const [questions, setQuestions] = React.useState(defaultQuestions);

  const getSelectedQuestion = () => {
    return questions.find((question) => question.selected);
  };

  const setSelectedItem = (itemId: number) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === itemId
          ? { ...question, selected: true }
          : { ...question, selected: false }
      )
    );
  };

  return (
    <div className="row">
      <div className="column" style={{ marginLeft: "105px" }}>
        {questions.map((question) => (
          <Card
            key={question.id}
            style={{ width: 300, marginBottom: 30 }}
            actions={[
              <Badge
                count={countLikes}
                size="small"
                style={{ backgroundColor: "#fff", color: "#999" }}
              >
                <LikeOutlined
                  key="vote"
                  onClick={() => setCountLikes(countLikes + 1)}
                />
              </Badge>,
              <SendOutlined
                key="answer"
                onClick={() => setSelectedItem(question.id)}
              />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Question title"
              description="This is the description"
            />
          </Card>
        ))}
      </div>
      <div>
        {getSelectedQuestion() && (
          <QuestionDetail
            setSelectedItem={setSelectedItem}
            setCountLikes={setCountLikes}
            countLikes={countLikes}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
