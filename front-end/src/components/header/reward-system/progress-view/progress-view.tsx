import { useEffect, useState } from "react";

import { HeartTwoTone, StarTwoTone } from "@ant-design/icons";
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

import {
  Challenges,
  GetPersonalChallengesDocument,
  useCreateChallengeMutation,
  useGetSystemChallengesQuery,
} from "../../../../generated/graphql";
import { useGetPersonalChallengesQuery } from "../../../../generated/graphql";

const ProgressView = () => {
  const [lifePercent, setLifePercent] = useState(100);
  const [experiencePercent, setExperiencePercent] = useState(0);
  const [showNewChallengeForm, setShowNewChallengeForm] = useState(false);
  const [systemChallenges, setSystemChallenges] = useState<Challenges[]>([]);
  const [personalChallenges, setPersonalChallenges] = useState<Challenges[]>(
    []
  );
  const [showSystemChallenges, setShowSystemChallenges] = useState(true);

  const { data, error } = useGetSystemChallengesQuery({
    fetchPolicy: "network-only",
  });

  const personalChallengeValues = useGetPersonalChallengesQuery({
    fetchPolicy: "network-only",
  });

  const [createChallenge] = useCreateChallengeMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetPersonalChallengesDocument }],
  });

  useEffect(() => {
    if (data?.getSystemChallenges) {
      setSystemChallenges(data.getSystemChallenges as Challenges[]);
    }

    if (personalChallengeValues.data?.getPersonalChallenges) {
      setPersonalChallenges(
        personalChallengeValues.data.getPersonalChallenges as Challenges[]
      );
    }

    if (error?.message || personalChallengeValues.error) {
      console.log("Error", error?.message || personalChallengeValues.error);
    }
  }, [data?.getSystemChallenges, personalChallengeValues.data]);

  const onNewChallenge = () => {
    setShowNewChallengeForm(!showNewChallengeForm);
    setShowSystemChallenges(true);
  };

  const handleAddChallenge = async values => {
    if (values.challenge) {
      onNewChallenge();
      try {
        const response = await createChallenge({
          variables: {
            content: values.challenge,
            isSystemChallenge: false,
          },
        });
        if (response) {
          // refetch getPersonalChallenge
        }
      } catch (err: any) {
        console.log(err);
        notification.error({
          message: "Oops, there was a problem with your request.",
        });
      }
    }
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
            <Form name="personalChallengeForm" onFinish={handleAddChallenge}>
              <Input.Group compact>
                <Form.Item name="challenge" className="challenge-wrapper">
                  <Input placeholder="Add your challenge" allowClear />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Input.Group>
            </Form>
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
                dataSource={personalChallenges}
                renderItem={(item, index) => {
                  <List.Item>
                    <List.Item.Meta description={item.content} />
                    <Steps
                      style={{ marginTop: 8 }}
                      status={item.status as StepsProps["status"]}
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
