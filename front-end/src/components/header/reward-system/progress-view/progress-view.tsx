import { useState } from "react";

import { HeartTwoTone, StarTwoTone } from "@ant-design/icons";
import { Progress } from "antd";
import Card from "antd/lib/card/Card";

import "./progress-view.css";
import { Button } from "antd/lib/radio";

const ProgressView = () => {
  const [lifePercent, setLifePercent] = useState(100);
  const [experiencePercent, setExperiencePercent] = useState(0);
  const [showNewChallengeForm, setShowNewChallengeForm] = useState(false);

  const onNewChallenge = () => {
    setShowNewChallengeForm(!showNewChallengeForm);
  };

  return (
    <div className="progress-wrapper">
      <h3 className="title">The Challenging Side</h3>
      <Card title="Progress" bordered={false}>
        <div className="progress-item">
          <HeartTwoTone
            twoToneColor="#eb2f96"
            style={{ marginRight: "10px" }}
          />
          <Progress
            percent={lifePercent}
            status="active"
            strokeColor="#eb2f96"
          />
        </div>

        <div className="progress-item">
          <StarTwoTone style={{ marginRight: "10px" }} />
          <Progress percent={experiencePercent} status="active" />
        </div>
      </Card>
      <Card
        title="Challenges"
        extra={
          <Button onClick={onNewChallenge}>
            {showNewChallengeForm ? "Go back" : "+ New challenge"}
          </Button>
        }>
        {showNewChallengeForm ? (
          <>new challenge form</>
        ) : (
          <>
            <p>Challenge 1</p>
            <p>Challenge 2</p>
            <p>Challenge 3</p>
          </>
        )}
      </Card>
    </div>
  );
};

export default ProgressView;
