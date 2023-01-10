import React from "react";

import "../dashboard.css";

import QuestionsContext from "../../../contexts/QuestionsProvider";
import QuestionCard from "./question-card";
import { useGetCurrentUserQuery } from "../../../generated/graphql";
import { Result } from "antd";

const QuestionsList = ({ isDraftVisible }) => {
  const { allQuestions } = React.useContext(QuestionsContext);
  const { data } = useGetCurrentUserQuery();

  const drafts = allQuestions.filter(
    question =>
      question.isDraft && question.author?._id === data?.getCurrentUser?._id
  );
  const questions = allQuestions.filter(question => !question.isDraft);

  return (
    <>
      {isDraftVisible ? (
        <>
          {drafts.length ? (
            <QuestionCard
              questions={drafts}
              isDraftVisible={isDraftVisible}
              currentUser={data?.getCurrentUser}
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
            <QuestionCard
              questions={questions}
              currentUser={data?.getCurrentUser}
            />
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
  );
};

export default QuestionsList;
