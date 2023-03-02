import React from "react";

import {
  Card,
  Avatar,
  Tag,
  Typography,
  Badge,
  Divider,
  Button,
  Form,
} from "antd";
import { CloseCircleOutlined, LikeOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

import "./question-detail.css";
import {
  Question,
  useCountVotesForQuestionMutation,
  useCreateCommentMutation,
  useGetCommentsForQuestionQuery,
  useGetCurrentUserQuery,
  useIsUserAlreadyVotedQuestionQuery,
} from "../../../generated/graphql";

import QuestionsContext from "../../../contexts/QuestionsProvider";
import Answer from "./Answer";
import ErrorHandler from "../../ErrorHandler";

const { Meta } = Card;
const { Paragraph } = Typography;

type Props = {
  selectedQuestion: Question;
};

const QuestionDetail = ({ selectedQuestion }: Props) => {
  const [countVotesForQuestionMutation] = useCountVotesForQuestionMutation();
  const [createCommentMutation] = useCreateCommentMutation();
  const { data, error } = useGetCommentsForQuestionQuery({
    variables: { questionId: selectedQuestion._id },
    fetchPolicy: "network-only",
  });
  const isUserAlreadyVotedQuestion = useIsUserAlreadyVotedQuestionQuery({
    variables: { questionId: selectedQuestion._id },
    fetchPolicy: "network-only",
  });
  const currentUser = useGetCurrentUserQuery({
    fetchPolicy: "network-only",
  });

  const { setSelectedQuestion } = React.useContext(QuestionsContext);

  const [allComments, setAllComments] = React.useState<Comment[]>([]);
  const [isCommentEmpty, setIsCommentEmpty] = React.useState<boolean>(true);
  const [countLikes, setCountLikes] = React.useState(
    selectedQuestion.votes || 0
  );
  const [isLiked, setIsLiked] = React.useState(
    isUserAlreadyVotedQuestion.data?.isUserAlreadyVotedQuestion?.length
      ? true
      : false
  );

  const [addCommentForm] = Form.useForm();

  React.useEffect(() => {
    if (data?.getCommentsForQuestion) {
      setAllComments(data.getCommentsForQuestion as Comment[]);
    }
  }, [data]);

  React.useEffect(() => {
    setCountLikes(selectedQuestion.votes || 0);
  }, [selectedQuestion]);

  const LikeIcon = ({ disabled, ...props }) => {
    if (
      currentUser.data?.getCurrentUser?._id === selectedQuestion.author?._id
    ) {
      return <LikeOutlined className={disabled && "disabled-delete"} />;
    } else {
      return <LikeOutlined {...props} />;
    }
  };

  const handleVotes = async () => {
    const votes = await countVotesForQuestionMutation({
      variables: { questionId: selectedQuestion._id },
    });

    setIsLiked(!isLiked);
    setCountLikes(votes.data?.countVotesForQuestion as number);
  };

  const handleAddComment = async values => {
    const newComment = await createCommentMutation({
      variables: { questionId: selectedQuestion._id, message: values.message },
    });

    if (newComment.data) {
      setAllComments(prev => [
        newComment.data?.createComment as Comment,
        ...prev,
      ]);
    }
    addCommentForm.resetFields();
  };

  return (
    <Card
      bordered={false}
      style={{ width: "90%", marginLeft: "30px" }}
      extra={[
        <CloseCircleOutlined
          key={selectedQuestion._id}
          onClick={() => setSelectedQuestion(undefined)}
        />,
      ]}>
      <div className="question-header">
        <Meta
          avatar={
            <Avatar
              src={
                selectedQuestion.author?.avatarUrl
                  ? selectedQuestion.author.avatarUrl
                  : "https://gravatar.com/avatar/1da2c054325d6908ceb9f454af161c3a?s=400&d=retro&r=x"
              }
            />
          }
          title={selectedQuestion.title}
        />
        <div>
          <Badge count={countLikes} style={{ backgroundColor: "#3388CB" }} />
          <LikeIcon
            key="vote"
            onClick={handleVotes}
            disabled={
              currentUser.data?.getCurrentUser?._id ===
              selectedQuestion.author?._id
            }
          />
        </div>
      </div>

      <Paragraph style={{ margin: "10px 0" }}>
        {selectedQuestion.content && (
          <div className="additional">
            <div
              dangerouslySetInnerHTML={{
                __html: selectedQuestion.content,
              }}></div>
          </div>
        )}
      </Paragraph>
      {selectedQuestion.tags?.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
      <Divider />
      <div>
        <Form
          name="addComment"
          form={addCommentForm}
          onFinish={handleAddComment}>
          <Form.Item name="message" style={{ marginBottom: "0px" }}>
            <TextArea
              placeholder="Write your answer"
              autoSize={{ minRows: 2, maxRows: 10 }}
              allowClear
              onChange={event => {
                setIsCommentEmpty(event.target.value.length > 0 ? false : true);
              }}
            />
          </Form.Item>
          <Form.Item style={{ display: "flex", alignItems: "flex-end" }}>
            <Button
              type="text"
              htmlType="submit"
              style={{
                color: "#1890FF",
              }}
              disabled={isCommentEmpty}>
              Add comment
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        {allComments.map((comment, index) => {
          return (
            <Answer
              key={index}
              comment={comment}
              setAllComments={setAllComments}></Answer>
          );
        })}
      </div>

      {error && <ErrorHandler error={error} />}
    </Card>
  );
};

export default QuestionDetail;
