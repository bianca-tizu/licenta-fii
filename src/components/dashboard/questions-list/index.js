import React from 'react';
import { Card, Avatar } from 'antd';
import { SendOutlined, LikeOutlined, SettingOutlined } from '@ant-design/icons';
import QuestionDetail from '../question-detail';

const { Meta } = Card;

const defaultQuestions = [{id: 1, selected:false},{id: 2, selected:false},{id:3, selected:false},{id: 4, selected:false},{id: 5, selected:false}]

const QuestionsList = () => {
  const [questions, setQuestions] = React.useState(defaultQuestions);

  const getSelectedQuestion = () => {
    return questions.find(question => question.selected);
  }

  const setSelectedItem = (itemId) => {
    setQuestions((prev) => prev.map(question => question.id === itemId ? {...question, selected:true} : {...question, selected:false}))
  }

    return (
    <div className="row">
      <div className="column">
        {questions.map(question => <Card
        key={ question.id }
        style={{ width: 300, marginBottom: 30 }}
        actions={[
          <LikeOutlined key="vote"/>,
          <SettingOutlined key="setting" />,
          <SendOutlined key="answer" onClick={() => setSelectedItem(question.id)}/>,
        ]}
        >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title="Question title"
        description="This is the description"
        />
    </Card>
    )}
    </div>
    <div>
      {getSelectedQuestion() && <QuestionDetail/>}
    </div>
  </div>
  );
}

export default QuestionsList;