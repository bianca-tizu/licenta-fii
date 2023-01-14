import * as React from "react";
import { ApolloError } from "@apollo/client";
import { useQuestionsQuery, Question } from "../generated/graphql";

type questionDialog = {
  isVisible: boolean;
  action: string;
};

type QuestionsContextData = {
  allQuestions: Question[];
  selectedQuestion: Question | undefined;
  setSelectedQuestion: (question: Question | undefined) => void;
  addQuestion: (question: Question) => void;
  removeQuestion: (questionId: String) => void;
  setSearchResults: (results) => void;
  error: ApolloError | undefined;
  loading: boolean;
  isQuestionDialogVisible: questionDialog;
  setIsQuestionDialogVisible: (value) => void;
};

const defaultQuestionsContext = {
  allQuestions: [],
  selectedQuestion: {},
  setSelectedQuestion: (question: Question | undefined) => {},
  addQuestion: (question: Question) => {},
  removeQuestion: (questionId: String) => {},
  setSearchResults: results => {},
  error: undefined,
  loading: false,
  isQuestionDialogVisible: { isVisible: false, action: "" },
  setIsQuestionDialogVisible: () => {
    return { isVisible: false, action: "" };
  },
};

const QuestionsContext = React.createContext<QuestionsContextData>(
  defaultQuestionsContext
);

export const QuestionsProvider: React.FC = ({ children }) => {
  const { data, loading, error } = useQuestionsQuery();

  const [allQuestions, setAllQuestions] = React.useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = React.useState<Question>();
  const [isQuestionDialogVisible, setIsQuestionDialogVisible] = React.useState({
    isVisible: false,
    action: "",
  });

  React.useEffect(() => {
    if (data?.getAllQuestions) {
      setAllQuestions(data.getAllQuestions as Question[]);
    }
  }, [data]);

  const addQuestion = (question: Question) => {
    setAllQuestions(prev => [question, ...prev]);
    setSelectedQuestion(question.isDraft ? undefined : question);
  };

  const removeQuestion = (questionId: String) => {
    setAllQuestions(prev => prev.filter(q => q._id !== questionId));
    setSelectedQuestion(undefined);
  };

  const setSearchResults = results => {
    if (results) {
      setAllQuestions(results);
    } else {
      setAllQuestions(data?.getAllQuestions as Question[]);
    }
    setSelectedQuestion(undefined);
  };

  const questionsData = {
    allQuestions,
    selectedQuestion,
    setSelectedQuestion,
    addQuestion,
    removeQuestion,
    setSearchResults,
    error,
    loading,
    isQuestionDialogVisible,
    setIsQuestionDialogVisible,
  };

  return (
    <QuestionsContext.Provider value={questionsData}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
