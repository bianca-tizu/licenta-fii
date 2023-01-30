import {
  DeleteOutlined,
  DownCircleOutlined,
  EditOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Modal } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";

import {
  Question,
  QuestionsDocument,
  useDeleteQuestionMutation,
  useGetCurrentUserQuery,
} from "../../../../generated/graphql";

import QuestionsContext from "../../../../contexts/QuestionsProvider";
import QuestionDetail from "../../question-detail";
import ErrorHandler from "../../../ErrorHandler";

import "../../dashboard.css";

const QuestionCard = props => {
  const {
    removeQuestion,
    allQuestionsLength,
    loadMoreQuestions,
    isLoadMore,
    selectedQuestion,
    setSelectedQuestion,
    setIsQuestionDialogVisible,
    setSelectedDraft,
  } = React.useContext(QuestionsContext);

  const { data } = useGetCurrentUserQuery({ fetchPolicy: "network-only" });

  const [deleteQuestionMutation, deleteResult] = useDeleteQuestionMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: QuestionsDocument }],
    onCompleted() {
      if (!props.isDraftVisible) {
        window.location.reload(); // temp solution to cause app to re-render
      }
    },
  });
  const [_, setIsDeleteModalOpen] = React.useState(false);

  const DeleteIcon = ({ disabled, ...props }) => {
    if (disabled) {
      return <DeleteOutlined className={disabled && "disabled-delete"} />;
    } else {
      return <DeleteOutlined {...props} />;
    }
  };

  const getCardActions = (question, disableDeleteButton) => {
    if (question.isDraft) {
      return [
        <DeleteIcon
          disabled={disableDeleteButton}
          onClick={() => {
            Modal.confirm({
              content: "Are you sure you want to delete this question?",
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
        <EditOutlined
          onClick={() => {
            setIsQuestionDialogVisible({ isVisible: true, action: "edit" });
            setSelectedDraft(question);
          }}
        />,
      ];
    } else {
      return [
        <DeleteIcon
          disabled={disableDeleteButton}
          onClick={() => {
            Modal.confirm({
              content: "Are you sure you want to delete this question?",
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
          onClick={() => {
            question.isDraft
              ? setSelectedQuestion(undefined)
              : setSelectedQuestion(question as Question);
            document.body.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />,
      ];
    }
  };

  const deleteQuestion = async (questionId: any) => {
    await deleteQuestionMutation({ variables: { id: questionId } });
    removeQuestion(questionId);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <div className="row">
        <div className="column" style={{ marginLeft: "105px" }}>
          {props.questions.map(question => {
            const disableDeleteButton =
              question.author?._id !== data?.getCurrentUser?._id ||
              !question.author?._id;
            return (
              <Card
                key={question._id}
                style={{ width: 300, marginBottom: 30 }}
                actions={getCardActions(question, disableDeleteButton)}>
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
                      }}></div>
                  </div>
                )}
              </Card>
            );
          })}
          {!props.isDraftVisible ? (
            <>
              {props.questions.length < allQuestionsLength ? (
                <>
                  {isLoadMore ? (
                    <Button
                      type="primary"
                      icon={<DownCircleOutlined />}
                      shape="round"
                      style={{ margin: "10px" }}
                      onClick={() => loadMoreQuestions(props.questions.length)}>
                      Load more
                    </Button>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}>
                  🏁 You've reached the end of the page! 🎉🎉🎉
                </p>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div style={{ width: "50%" }}>
          {selectedQuestion && !props?.isDraftVisible && (
            <QuestionDetail selectedQuestion={selectedQuestion} />
          )}
        </div>
      </div>

      {deleteResult.error && (
        <ErrorHandler error={deleteResult.error}></ErrorHandler>
      )}
    </>
  );
};

export default QuestionCard;
