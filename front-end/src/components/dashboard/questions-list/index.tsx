import React from "react";
import { Result, Spin } from "antd";

import "../dashboard.css";

import { useGetCurrentUserQuery } from "../../../generated/graphql";

import QuestionsContext from "../../../contexts/QuestionsProvider";
import QuestionCard from "./question-card";
import ErrorHandler from "../../ErrorHandler";

const QuestionsList = ({ isDraftVisible }) => {
  const { allQuestions, loading, allDrafts } =
    React.useContext(QuestionsContext);
  const { data, error } = useGetCurrentUserQuery({
    fetchPolicy: "network-only",
  });

  return (
    <div style={{ height: "calc(100vh - 150px - 48px)" }}>
      {loading ? (
        <div className="spinner-wrapper">
          <Spin
            spinning={allQuestions.length < 0 || loading}
            size="large"
            tip="Loading..."></Spin>
        </div>
      ) : (
        <>
          {isDraftVisible ? (
            <>
              {allDrafts.length ? (
                <QuestionCard
                  questions={allDrafts}
                  isDraftVisible={isDraftVisible}
                />
              ) : (
                <Result
                  status="404"
                  title="No drafts"
                  subTitle="You currently have no drafts."
                />
              )}
            </>
          ) : (
            <>
              {allQuestions.length ? (
                <QuestionCard questions={allQuestions} />
              ) : (
                <Result
                  status="404"
                  title="No questions"
                  subTitle="There are no questions added."
                />
              )}
            </>
          )}
        </>
      )}

      {error && <ErrorHandler error={error}></ErrorHandler>}
    </div>
  );
};

export default QuestionsList;
