import React from "react";

import { Card, Avatar, Modal } from "antd";
import {
  SendOutlined,
  CommentOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "../dashboard.css";

import {
  Question,
  useDeleteQuestionMutation,
  useGetCurrentUserQuery,
} from "../../../generated/graphql";
import QuestionDetail from "../question-detail";
import QuestionsContext from "../../../contexts/QuestionsProvider";

const { Meta } = Card;

const QuestionsList = ({ isDraftVisible }) => {
  const { allQuestions, removeQuestion } = React.useContext(QuestionsContext);
  const { data } = useGetCurrentUserQuery();
  const [deleteQuestionMutation] = useDeleteQuestionMutation();
  const [selectedItem, setSelectedItem] = React.useState<Question>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const drafts = allQuestions.filter(question => question.isDraft);

  const deleteQuestion = async (questionId: any) => {
    await deleteQuestionMutation({ variables: { id: questionId } });
    removeQuestion(questionId);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const DeleteIcon = ({ disabled, ...props }) => {
    if (disabled) {
      return <DeleteOutlined className={disabled && "disabled-delete"} />;
    } else {
      return <DeleteOutlined {...props} />;
    }
  };

  return (
    <>
      {allQuestions?.length ? (
        <div className="row">
          <div className="column" style={{ marginLeft: "105px" }}>
            {allQuestions
              .filter(question =>
                isDraftVisible ? question.isDraft : !question.isDraft
              )
              .map(question => {
                const disableDeleteButton =
                  question.author?._id !== data?.getCurrentUser?._id ||
                  !question.author?._id;
                return (
                  <Card
                    key={question._id}
                    style={{ width: 300, marginBottom: 30 }}
                    actions={[
                      <DeleteIcon
                        disabled={disableDeleteButton}
                        onClick={() => {
                          Modal.confirm({
                            content:
                              "Are you sure you want to delete this question?",
                            onOk() {
                              deleteQuestion(question._id);
                            },
                            okText: "Yes",
                            centered: true,
                            onCancel: handleCancel,
                            cancelText: "No",
                            width: 450,
                          });
                        }}
                      />,
                      <SendOutlined
                        key="answer"
                        onClick={() => setSelectedItem(question as Question)}
                      />,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar
                          src={
                            question.author?.avatarUrl
                              ? question.author.avatarUrl
                              : "https://gravatar.com/avatar/1da2c054325d6908ceb9f454af161c3a?s=400&d=retro&r=x"
                          }
                        />
                      }
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
                );
              })}
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
      {drafts.length < 1 && isDraftVisible && (
        <p>Sorry, but there is no draft to show.</p>
      )}
    </>
  );
};

export default QuestionsList;
