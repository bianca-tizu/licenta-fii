import * as React from "react";
import { ApolloError } from "@apollo/client";
import { useQuestionsQuery, Question } from "../generated/graphql";

type questionDialog = {
  isVisible: boolean;
  action: string;
};

type QuestionsContextData = {
  allQuestions: Question[];
  allQuestionsLength: number;
  selectedQuestion: Question | undefined;
  setSelectedQuestion: (question: Question | undefined) => void;
  addQuestion: (question: Question) => void;
  loadMoreQuestions: (questionsLength: Number) => any;
  removeQuestion: (questionId: String) => void;
  setSearchResults: (results) => void;
  error: ApolloError | undefined;
  loading: boolean;
  isQuestionDialogVisible: questionDialog;
  setIsQuestionDialogVisible: (value) => void;
  selectedDraft: Question | undefined;
  setSelectedDraft: (question: Question | undefined) => void;
};

const defaultQuestionsContext = {
  allQuestions: [],
  allQuestionsLength: 0,
  selectedQuestion: {},
  setSelectedQuestion: (question: Question | undefined) => {},
  addQuestion: (question: Question) => {},
  loadMoreQuestions: (questionsLength: Number) => {},
  removeQuestion: (questionId: String) => {},
  setSearchResults: results => {},
  error: undefined,
  loading: false,
  isQuestionDialogVisible: { isVisible: false, action: "" },
  setIsQuestionDialogVisible: () => {
    return { isVisible: false, action: "" };
  },
  selectedDraft: {},
  setSelectedDraft: (question: Question | undefined) => {},
};

const QuestionsContext = React.createContext<QuestionsContextData>(
  defaultQuestionsContext
);

export const QuestionsProvider: React.FC = ({ children }) => {
  const { data, loading, error, fetchMore } = useQuestionsQuery({
    variables: { offset: 0, limit: 5 },
    fetchPolicy: "network-only",
  });

  const [allQuestions, setAllQuestions] = React.useState<Question[]>([]);
  const [allQuestionsLength, setAllQuestionsLength] = React.useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = React.useState<Question>();
  const [selectedDraft, setSelectedDraft] = React.useState<Question>();
  const [isQuestionDialogVisible, setIsQuestionDialogVisible] = React.useState({
    isVisible: false,
    action: "",
  });

  React.useEffect(() => {
    if (data?.getAllQuestions && !allQuestionsLength) {
      setAllQuestions(data.getAllQuestions.questions as Question[]);
      setAllQuestionsLength(data.getAllQuestions.questionsNo as number);
    }
  }, [data]);

  const addQuestion = question => {
    if (question.createQuestion) {
      setAllQuestions(prev => [question.createQuestion, ...prev]);
      setSelectedQuestion(
        question.createQuestion.isDraft ? undefined : question.createQuestion
      );
    } else {
      if (question.updateQuestion) {
        setAllQuestions(prev => {
          return prev.filter(q => {
            if (q._id === question.id) {
              return [question, ...prev];
            }
            return prev;
          });
        });

        setSelectedDraft(undefined);
      }
    }
  };

  const loadMoreQuestions = async questionsLength => {
    const currentLength = questionsLength || 0;

    if (currentLength < allQuestionsLength) {
      const fetchedQuestions = await fetchMore({
        variables: { offset: currentLength, limit: 5 },
      });
      setAllQuestions(prev => [
        ...prev,
        ...(fetchedQuestions.data.getAllQuestions?.questions as Question[]),
      ]);
    }
  };

  const removeQuestion = (questionId: String) => {
    setAllQuestions(prev => prev.filter(q => q._id !== questionId));
    setSelectedQuestion(undefined);
  };

  const setSearchResults = results => {
    if (results) {
      setAllQuestions(results);
    } else {
      setAllQuestions(data?.getAllQuestions?.questions as Question[]);
    }
    setSelectedQuestion(undefined);
  };

  const questionsData = {
    allQuestions,
    allQuestionsLength,
    selectedQuestion,
    setSelectedQuestion,
    addQuestion,
    loadMoreQuestions,
    removeQuestion,
    setSearchResults,
    error,
    loading,
    isQuestionDialogVisible,
    setIsQuestionDialogVisible,
    selectedDraft,
    setSelectedDraft,
  };

  return (
    <QuestionsContext.Provider value={questionsData}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
