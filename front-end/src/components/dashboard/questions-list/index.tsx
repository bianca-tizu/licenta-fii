import React from "react";

import { Card, Avatar, Badge } from "antd";
import { SendOutlined, LikeOutlined } from "@ant-design/icons";

import "../dashboard.css";

import { Question, useQuestionsQuery } from "../../../generated/graphql";
import QuestionDetail from "../question-detail";
import QuestionsContext from "../../../contexts/QuestionsProvider";

const { Meta } = Card;

const QuestionsList = () => {
  const { allQuestions, error } = React.useContext(QuestionsContext);
  const [selectedItem, setSelectedItem] = React.useState<Question>();
  const [countLikes, setCountLikes] = React.useState(
    selectedItem ? selectedItem.votes : 0
  );

  return (
    <>
      {allQuestions?.length ? (
        <div className="row">
          <div className="column" style={{ marginLeft: "105px" }}>
            {allQuestions.map((question) => (
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
                    onClick={() => setSelectedItem(question as Question)}
                  />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={question.title}
                  description={question.content}
                />
              </Card>
            ))}
          </div>
          <div>
            {selectedItem && (
              <QuestionDetail
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                setCountLikes={setCountLikes}
                countLikes={countLikes}
              />
            )}
          </div>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
};

export default QuestionsList;
