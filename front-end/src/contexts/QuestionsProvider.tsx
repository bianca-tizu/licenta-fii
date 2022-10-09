import * as React from "react";
import { ApolloError } from "@apollo/client";
import { useQuestionsQuery, Question } from "../generated/graphql";

type QuestionsContextData = {
  allQuestions: Question[];
  addQuestion: (question: Question) => void;
  setSearchResults: (results) => void;
  error: ApolloError | undefined;
};

const defaultQuestionsContext = {
  allQuestions: [],
  addQuestion: (question: Question) => {},
  setSearchResults: results => {},
  error: undefined,
};

const QuestionsContext = React.createContext<QuestionsContextData>(
  defaultQuestionsContext
);

export const QuestionsProvider: React.FC = ({ children }) => {
  const { data, error } = useQuestionsQuery();

  const [allQuestions, setAllQuestions] = React.useState<Question[]>([]);

  React.useEffect(() => {
    if (data?.getAllQuestions) {
      setAllQuestions(data.getAllQuestions as Question[]);
    }
  }, [data, allQuestions]);

  const addQuestion = (question: Question) => {
    setAllQuestions(prev => [question, ...prev]);
  };

  const setSearchResults = results => {
    setAllQuestions(prev =>
      prev.filter(question =>
        results.some(result => result._id === question._id)
      )
    );
    console.log("setAllQuestions", allQuestions);
  };

  const questionsData = {
    allQuestions,
    addQuestion,
    setSearchResults,
    error,
  };

  return (
    <QuestionsContext.Provider value={questionsData}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
