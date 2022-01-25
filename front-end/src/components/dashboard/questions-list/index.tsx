import React from "react";

import { Card, Avatar, Badge } from "antd";
import { SendOutlined, LikeOutlined, CommentOutlined } from "@ant-design/icons";

import "../dashboard.css";

import { Question, useQuestionsQuery } from "../../../generated/graphql";
import QuestionDetail from "../question-detail";
import QuestionsContext from "../../../contexts/QuestionsProvider";

const { Meta } = Card;

const QuestionsList = () => {
  const { allQuestions } = React.useContext(QuestionsContext);
  const [selectedItem, setSelectedItem] = React.useState<Question>();
  const [countComments, setCountComments] = React.useState(0);
  console.log(allQuestions);
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
                  <CommentOutlined />,
                  <SendOutlined
                    key="answer"
                    onClick={() => setSelectedItem(question as Question)}
                  />,
                ]}
              >
                <Meta
                  avatar={<Avatar src={question.author.avatar} />}
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
              />
            )}
          </div>
        </div>
      ) : (
        <p>Oops, there was a problem</p>
      )}
    </>
  );
};

export default QuestionsList;
