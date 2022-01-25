import * as React from "react";
import { ApolloError } from "@apollo/client";
import { useQuestionsQuery, Question } from "../generated/graphql";

type QuestionsContextData = {
  allQuestions: Question[];
  addQuestion: (question: Question) => void;
  error: ApolloError | undefined;
};

const defaultQuestionsContext = {
  allQuestions: [],
  addQuestion: (question: Question) => {},
  error: undefined,
};

const QuestionsContext = React.createContext<QuestionsContextData>(
  defaultQuestionsContext
);

export const QuestionsProvider: React.FC = ({ children }) => {
  const { data, error } = useQuestionsQuery();
  const [allQuestions, setAllQuestions] = React.useState<Question[]>([]);
  console.log(data, error);

  React.useEffect(() => {
    console.log(data, error);
    if (data?.questions) {
      setAllQuestions(data.questions as Question[]);
    }
  }, [data]);

  const addQuestion = (question: Question) => {
    setAllQuestions((prev) => [...prev, question]);
  };

  const questionsData = {
    allQuestions,
    addQuestion,
    error,
  };

  return (
    <QuestionsContext.Provider value={questionsData}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
