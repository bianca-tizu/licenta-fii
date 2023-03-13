import { useState } from "react";

import { HeartTwoTone, StarTwoTone } from "@ant-design/icons";
import { Progress } from "antd";
import Card from "antd/lib/card/Card";

import "./progress-view.css";

const ProgressView = () => {
  const [lifePercent, setLifePercent] = useState(0);
  const [experiencePercent, setExperiencePercent] = useState(0);

  return (
    <div className="progress-wrapper">
      <h3 className="title">The Challenging Side</h3>
      <Card title="Progress" bordered={false}>
        <div className="progress-item">
          <HeartTwoTone twoToneColor="#eb2f96" />
          <Progress percent={lifePercent} status="active" />
        </div>

        <div className="progress-item">
          <StarTwoTone />
          <Progress percent={experiencePercent} status="active" />
        </div>
      </Card>
      <Card title="Challenges">
        <p>Content</p>
      </Card>
    </div>
  );
};

export default ProgressView;
