import React from "react";

import "../dashboard.css";

import QuestionsContext from "../../../contexts/QuestionsProvider";
import QuestionCard from "./question-card";
import { Question, useGetCurrentUserQuery } from "../../../generated/graphql";
import { Result, Spin } from "antd";

const QuestionsList = ({ isDraftVisible }) => {
  const { allQuestions, loading } = React.useContext(QuestionsContext);
  const { data } = useGetCurrentUserQuery();

  const drafts = allQuestions.filter(
    question =>
      question.isDraft && question.author?._id === data?.getCurrentUser?._id
  );
  const questions = allQuestions.filter(question => !question.isDraft);

  return (
    <div style={{ height: "calc(100vh - 150px - 48px)" }}>
      {loading ? (
        <div className="spinner-wrapper">
          <Spin
            spinning={allQuestions.length < 0 || loading}
            size="large"
            tip="Loading..."
          ></Spin>
        </div>
      ) : (
        <>
          {isDraftVisible ? (
            <>
              {drafts.length ? (
                <QuestionCard
                  questions={drafts}
                  isDraftVisible={isDraftVisible}
                />
              ) : (
                <Result
                  status="500"
                  title="500"
                  subTitle="Sorry, something went wrong."
                />
              )}
            </>
          ) : (
            <>
              {questions.length ? (
                <QuestionCard questions={questions} />
              ) : (
                <Result
                  status="500"
                  title="500"
                  subTitle="Sorry, something went wrong."
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionsList;
