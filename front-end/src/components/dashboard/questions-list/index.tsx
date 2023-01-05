import React from "react";

import "../dashboard.css";

import QuestionsContext from "../../../contexts/QuestionsProvider";
import QuestionCard from "./question-card";
import { useGetCurrentUserQuery } from "../../../generated/graphql";

const QuestionsList = ({ isDraftVisible }) => {
  const { allQuestions } = React.useContext(QuestionsContext);
  const { data } = useGetCurrentUserQuery();
  const drafts = allQuestions.filter(
    question =>
      question.isDraft && question.author?._id === data?.getCurrentUser?._id
  );
  const questions = allQuestions.filter(question => !question.isDraft);
  console.log(allQuestions);

  return (
    <>
      {isDraftVisible ? (
        <>
          {drafts.length ? (
            <QuestionCard
              questions={drafts}
              currentUser={data?.getCurrentUser}
            />
          ) : (
            <p>Sorry, but there is no draft to show.</p>
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
            <p>Oops, there was a problem</p>
          )}
        </>
      )}
    </>
  );
};

export default QuestionsList;
