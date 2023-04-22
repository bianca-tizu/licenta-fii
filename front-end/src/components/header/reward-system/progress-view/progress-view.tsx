import { useEffect, useState } from "react";

import { HeartTwoTone, StarTwoTone } from "@ant-design/icons";
import { Badge, Input, List, Progress, Steps, StepsProps, Tabs } from "antd";
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
  const [showSystemChallenges, setShowSystemChallenges] = useState(true);

  const { data, error } = useGetSystemChallengesQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getSystemChallenges) {
      setSystemChallenges(data.getSystemChallenges as Challenges[]);
    }
  }, [data?.getSystemChallenges]);

  const onNewChallenge = () => {
    setShowNewChallengeForm(!showNewChallengeForm);
    setShowSystemChallenges(true);
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
          <>
            <p>Define a new challenge</p>
            <Input.Group compact>
              <Input placeholder="Add you challenge" />
              <Button type="primary">Add</Button>
            </Input.Group>
          </>
        ) : (
          <>
            <Tabs
              defaultActiveKey="1"
              type="card"
              onChange={selectedKey =>
                setShowSystemChallenges(selectedKey === "1")
              }
              items={[
                {
                  label: "Challenges",
                  key: "1",
                },
                {
                  label: "Personal Challenges",
                  key: "2",
                },
              ]}
            />
            {showSystemChallenges ? (
              systemChallenges
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
                          status={
                            status === "started" ? "default" : "processing"
                          }
                        />
                        {content}
                      </p>
                    );
                  }
                })
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={[]}
                renderItem={(item, index) => {
                  <List.Item>
                    <List.Item.Meta description={item} />
                    <Steps
                      style={{ marginTop: 8 }}
                      status={item as StepsProps["status"]}
                    />
                  </List.Item>;
                }}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default ProgressView;
