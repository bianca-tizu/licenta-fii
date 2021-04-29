import React from 'react';
import { Card, Avatar, Tag, Typography, Badge, Divider  } from 'antd';
import { CloseCircleOutlined, LikeOutlined } from '@ant-design/icons';

import './question-detail.css';
import Answer from './Answer';

const { Meta } = Card;
const { Paragraph } = Typography;

type Props = {
    setSelectedItem: any, setCountLikes: any, countLikes: number
}

const QuestionDetail = ({setSelectedItem, setCountLikes, countLikes}: Props) => {

    return(
        <Card
        bordered={false}
        style={{ width: "90%", marginLeft: "30px" }}
        extra={[
            <CloseCircleOutlined onClick={() => setSelectedItem()}/>,
        ]}
      >
        <div className="question-header">
            <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Question title"
            />
            <div>
            <Badge count={countLikes} style={{ backgroundColor: '#3388CB' }}/>
            <LikeOutlined key="vote" onClick={() => setCountLikes(countLikes+1)}/>
            </div>
        </div>

        <Paragraph style={{margin: "10px 0"}}>
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
        </Paragraph>
        <Tag>Tag 1</Tag>
        <Tag>Tag 2</Tag>
        <Divider />
        <Answer> 
            <Answer>
            </Answer> 
        </Answer>

      </Card>
    );
}

export default QuestionDetail;