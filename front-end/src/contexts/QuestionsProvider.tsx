import * as React from "react";
import { ApolloError } from "@apollo/client";
import {
  useQuestionsQuery,
  Question,
  useGetAllDraftsQuestionsQuery,
} from "../generated/graphql";

type questionDialog = {
  isVisible: boolean;
  action: string;
};

type QuestionsContextData = {
  allQuestions: Question[];
  allDrafts: Question[];
  allQuestionsLength: number;
  isLoadMore: boolean;
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
  allDrafts: [],
  allQuestionsLength: 0,
  isLoadMore: true,
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
  const drafts = useGetAllDraftsQuestionsQuery({
    fetchPolicy: "network-only",
  });

  const [allQuestions, setAllQuestions] = React.useState<Question[]>([]);
  const [allDrafts, setAllDrafts] = React.useState<Question[]>([]);
  const [allQuestionsLength, setAllQuestionsLength] = React.useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = React.useState<Question>();
  const [selectedDraft, setSelectedDraft] = React.useState<Question>();
  const [isLoadMore, setIsLoadMore] = React.useState<boolean>(false);
  const [isQuestionDialogVisible, setIsQuestionDialogVisible] = React.useState({
    isVisible: false,
    action: "",
  });

  React.useEffect(() => {
    if (data?.getAllQuestions && !allQuestionsLength) {
      setAllQuestions(data.getAllQuestions.questions as Question[]);
      setAllQuestionsLength(data.getAllQuestions.questionsNo as number);
    }
    if (drafts.data?.getAllDraftsQuestions) {
      setAllDrafts(drafts.data.getAllDraftsQuestions as Question[]);
    }
  }, [data, drafts]);

  const addQuestion = question => {
    if (question.createQuestion) {
      createQuestion(question);
    }
    if (question.updateQuestion) {
      updateQuestion(question);
    }
  };

  const createQuestion = question => {
    if (question.createQuestion.isDraft) {
      setAllDrafts(prev => [question.createQuestion, ...prev]);
      setSelectedQuestion(undefined);
    } else {
      setAllQuestions(prev => [question.createQuestion, ...prev]);
      setSelectedQuestion(question.createQuestion);
    }
  };

  const updateQuestion = question => {
    if (question.updateQuestion.isDraft === false) {
      setAllQuestions(prev => {
        return prev.filter(q => {
          if (q._id === question.id) {
            return [question, ...prev];
          }
          return prev;
        });
      });

      setAllDrafts(prev =>
        prev.filter(q => {
          return q._id !== question.id;
        })
      );
    } else {
      setAllDrafts(prev => {
        return prev.filter(q => {
          if (q._id === question.id) {
            return [question, ...prev];
          }
          return prev;
        });
      });
    }
    setSelectedDraft(undefined);
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
    setAllDrafts(prev => prev.filter(q => q._id !== questionId));
    setSelectedQuestion(undefined);
  };

  const setSearchResults = results => {
    if (results) {
      setAllQuestions(results);
      setIsLoadMore(false);
    } else {
      setAllQuestions(data?.getAllQuestions?.questions as Question[]);
      setIsLoadMore(true);
    }
    setSelectedQuestion(undefined);
  };

  const questionsData = {
    allQuestions,
    allDrafts,
    isLoadMore,
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
