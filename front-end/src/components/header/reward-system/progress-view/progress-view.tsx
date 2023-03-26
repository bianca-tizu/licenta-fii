import { useEffect, useState } from "react";

import { HeartTwoTone, StarTwoTone } from "@ant-design/icons";
import { Badge, Progress } from "antd";
import Card from "antd/lib/card/Card";

import "./progress-view.css";
import { Button } from "antd/lib/radio";
import {
  Challenges,
  useGetSystemChallengesQuery,
} from "../../../../generated/graphql";

const ProgressView = () => {
  const [lifePercent, setLifePercent] = useState(100);
  const [experiencePercent, setExperiencePercent] = useState(0);
  const [showNewChallengeForm, setShowNewChallengeForm] = useState(false);
  const [systemChallenges, setSystemChallenges] = useState<Challenges[]>([]);

  const { data, error } = useGetSystemChallengesQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getSystemChallenges) {
      setSystemChallenges(data.getSystemChallenges as Challenges[]);
    }
    console.log(data);
  }, [data?.getSystemChallenges]);

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
            {systemChallenges
              .filter(
                challenge =>
                  challenge.status === "started" ||
                  challenge.status === "progress"
              )
              .map((systemChallenge, index) => {
                const { _id, status, content } = systemChallenge;
                if (index < 4) {
                  return (
                    <p key={_id}>
                      <Badge
                        style={{ paddingRight: "10px" }}
                        status={status === "started" ? "default" : "processing"}
                      />
                      {content}
                    </p>
                  );
                }
              })}
          </>
        )}
      </Card>
    </div>
  );
};

export default ProgressView;
