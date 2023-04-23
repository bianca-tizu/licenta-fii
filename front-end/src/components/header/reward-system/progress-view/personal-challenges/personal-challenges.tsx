import { CheckOutlined } from "@ant-design/icons";
import { Badge, Button, Empty, notification } from "antd";
import {
  Challenges,
  GetPersonalChallengesDocument,
  useGetPersonalChallengesQuery,
  useUpdateChallengeStatusMutation,
} from "../../../../../generated/graphql";
import { useEffect, useState } from "react";

import "./personal-challenge.css";

const PersonalChallenges = ({ setLifePercent, setExperiencePercent }) => {
  const [challenges, setChallenges] = useState<Challenges[]>([]);

  const personalChallengeValues = useGetPersonalChallengesQuery({
    fetchPolicy: "network-only",
  });

  const [updateChallenge] = useUpdateChallengeStatusMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetPersonalChallengesDocument }],
  });

  const handlePersonalChallengeCheck = async challengeId => {
    try {
      const response = await updateChallenge({
        variables: {
          challengeId: challengeId,
        },
      });
      if (response) {
        notification.success({
          message: "Your challenge was successfully marked as done.",
        });
        // setLifePercent(response.data?.updateChallengeStatus.);
        //display notifications for gaining XP and user lvl(if case)
      }
    } catch (err: any) {
      console.log(err);
      notification.error({
        message: "Oops, there was a problem with your request.",
      });
    }
  };

  useEffect(() => {
    if (personalChallengeValues.data?.getPersonalChallenges) {
      setChallenges(
        personalChallengeValues.data.getPersonalChallenges
          .challenges as Challenges[]
      );
      setLifePercent(
        personalChallengeValues.data.getPersonalChallenges.user?.life ?? 100
      );
      setExperiencePercent(
        personalChallengeValues.data.getPersonalChallenges.user?.experience ?? 0
      );
    }

    if (personalChallengeValues.error) {
      console.log("Error", personalChallengeValues.error);
    }
  }, [personalChallengeValues.data?.getPersonalChallenges]);
  return (
    <>
      {challenges.filter(
        challenge =>
          challenge.status === "started" || challenge.status === "progress"
      ).length ? (
        challenges
          .filter(
            challenge =>
              challenge.status === "started" || challenge.status === "progress"
          )
          .map((personalChallenge, index) => {
            if (index < 4) {
              return (
                <div
                  className="personal-challenge-item"
                  key={personalChallenge._id}>
                  <p>
                    <Badge
                      style={{ paddingRight: "10px" }}
                      status={
                        personalChallenge.status === "started"
                          ? "default"
                          : "processing"
                      }
                    />
                    {personalChallenge.content}
                  </p>
                  <Button
                    shape="circle"
                    icon={<CheckOutlined />}
                    onClick={() =>
                      handlePersonalChallengeCheck(personalChallenge._id)
                    }
                  />
                </div>
              );
            }
          })
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

export default PersonalChallenges;
