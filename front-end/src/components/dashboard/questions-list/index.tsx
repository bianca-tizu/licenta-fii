import React from "react";

import { Card, Avatar } from "antd";
import { SendOutlined, CommentOutlined } from "@ant-design/icons";

import "../dashboard.css";

import { Question } from "../../../generated/graphql";
import QuestionDetail from "../question-detail";
import QuestionsContext from "../../../contexts/QuestionsProvider";

const { Meta } = Card;

const QuestionsList = ({ isDraftVisible }) => {
  const { allQuestions } = React.useContext(QuestionsContext);
  const [selectedItem, setSelectedItem] = React.useState<Question>();
  const [countComments, setCountComments] = React.useState(0);

  return (
    <>
      {allQuestions?.length ? (
        <div className="row">
          <div className="column" style={{ marginLeft: "105px" }}>
            {allQuestions
              .filter(question =>
                isDraftVisible ? question.isDraft : !question.isDraft
              )
              .map(question => (
                <Card
                  key={question._id}
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
                    avatar={<Avatar src={question.author?.avatarUrl} />}
                    title={question.title}
                  />
                  {question.content && (
                    <div className="additional">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: question.content.split(".")[0],
                        }}
                      ></div>
                    </div>
                  )}
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
