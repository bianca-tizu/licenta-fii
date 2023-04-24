import { useEffect, useState } from "react";

import { CheckOutlined, HeartTwoTone, StarTwoTone } from "@ant-design/icons";
import {
  Badge,
  Form,
  Input,
  List,
  Progress,
  Steps,
  StepsProps,
  Tabs,
  Button,
  notification,
} from "antd";
import Card from "antd/lib/card/Card";

import "./progress-view.css";

import PersonalChallenges from "./personal-challenges/personal-challenges";
import SystemChallenges from "./system-challenges/system-challenges";
import AddPersonalChallenge from "./personal-challenges/add-personal-challenge/add-personal-challenge";
import { useGetCurrentUserQuery } from "../../../../generated/graphql";

const ProgressView = () => {
  const [lifePercent, setLifePercent] = useState(100);
  const [experiencePercent, setExperiencePercent] = useState(0);

  const [showNewChallengeForm, setShowNewChallengeForm] = useState(false);

  const [showSystemChallenges, setShowSystemChallenges] = useState(true);
  const [selectedTabKey, setSelectedTabKey] = useState("1");

  const currentUser = useGetCurrentUserQuery({ fetchPolicy: "network-only" });

  const onNewChallenge = () => {
    setShowNewChallengeForm(!showNewChallengeForm);
    setShowSystemChallenges(true);
  };

  useEffect(() => {
    setLifePercent(currentUser.data?.getCurrentUser?.life ?? 100);
    setExperiencePercent(currentUser.data?.getCurrentUser?.experience ?? 0);
  }, [currentUser.data?.getCurrentUser]);

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
          <Progress
            percent={experiencePercent}
            status="active"
            format={percent => `${percent}xp`}
          />
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
          <AddPersonalChallenge
            showNewChallengeForm={showNewChallengeForm}
            setShowNewChallengeForm={setShowNewChallengeForm}
            setShowSystemChallenges={setShowSystemChallenges}
          />
        ) : (
          <>
            <Tabs
              defaultActiveKey="1"
              type="card"
              onChange={selectedKey => {
                setShowSystemChallenges(selectedKey === "1");
                setSelectedTabKey(selectedKey);
              }}
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
              <SystemChallenges />
            ) : (
              <PersonalChallenges
                setLifePercent={setLifePercent}
                setExperiencePercent={setExperiencePercent}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default ProgressView;
