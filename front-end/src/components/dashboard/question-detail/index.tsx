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

import "./question-detail.css";
import Answer from "./Answer";
import {
  Question,
  useCreateCommentMutation,
  useGetCommentsForQuestionQuery,
} from "../../../generated/graphql";
import TextArea from "antd/lib/input/TextArea";

const { Meta } = Card;
const { Paragraph } = Typography;

type Props = {
  selectedItem: Question;
  setSelectedItem: React.Dispatch<React.SetStateAction<Question | undefined>>;
};

const useCountVotesMutation = () => {
  return [""];
};
const QuestionDetail = ({ selectedItem, setSelectedItem }: Props) => {
  const [votes] = useCountVotesMutation();
  const [createCommentMutation] = useCreateCommentMutation();
  const { data, error } = useGetCommentsForQuestionQuery({
    variables: { questionId: selectedItem._id },
  });
  const [allComments, setAllComments] = React.useState<Comment[]>([]);
  const [isCommentEmpty, setIsCommentEmpty] = React.useState<boolean>(true);

  const [countLikes, setCountLikes] = React.useState(selectedItem.votes);
  const [addCommentForm] = Form.useForm();

  React.useEffect(() => {
    if (data?.getCommentsForQuestion) {
      setAllComments(data.getCommentsForQuestion as Comment[]);
    }
  }, [data]);

  const handleVotes = async () => {
    // const { data } = await votes({
    //   variables: { id: selectedItem._id },
    // });
    // if (data?.countVotes?.votes) {
    //   setCountLikes(data?.countVotes?.votes);
    // }
  };

  const handleAddComment = async values => {
    const newComment = await createCommentMutation({
      variables: { questionId: selectedItem._id, message: values.message },
    });

    if (newComment.data) {
      setAllComments(prev => [
        newComment.data?.createComment as Comment,
        ...prev,
      ]);
    }
  };

  return (
    <Card
      bordered={false}
      style={{ width: "90%", marginLeft: "30px" }}
      extra={[
        <CloseCircleOutlined
          key={selectedItem._id}
          onClick={() => setSelectedItem(undefined)}
        />,
      ]}
    >
      <div className="question-header">
        <Meta
          avatar={
            <Avatar
              src={
                selectedItem.author?.avatarUrl
                  ? selectedItem.author.avatarUrl
                  : "https://gravatar.com/avatar/1da2c054325d6908ceb9f454af161c3a?s=400&d=retro&r=x"
              }
            />
          }
          title={selectedItem.title}
        />
        <div>
          <Badge count={countLikes} style={{ backgroundColor: "#3388CB" }} />
          <LikeOutlined key="vote" onClick={handleVotes} />
        </div>
      </div>

      <Paragraph style={{ margin: "10px 0" }}>
        {selectedItem.content && (
          <div className="additional">
            <div
              dangerouslySetInnerHTML={{
                __html: selectedItem.content,
              }}
            ></div>
          </div>
        )}
      </Paragraph>
      {selectedItem.tags?.map(tag => (
        <Tag key={selectedItem._id}>{tag}</Tag>
      ))}
      <Divider />
      <div>
        <Form
          name="addComment"
          form={addCommentForm}
          onFinish={handleAddComment}
        >
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
              disabled={isCommentEmpty}
            >
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
              setAllComments={setAllComments}
            ></Answer>
          );
        })}
      </div>
    </Card>
  );
};

export default QuestionDetail;
