import { CheckOutlined } from "@ant-design/icons";
import { Badge, Button, Empty, notification } from "antd";
import {
  Challenges,
  GetPersonalChallengesDocument,
  useGetPersonalChallengesQuery,
  useUpdateChallengeStatusMutation,
  useUpdateNotificationStatusMutation,
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
  const [updateNotification] = useUpdateNotificationStatusMutation();

  const handlePersonalChallengeCheck = async challengeId => {
    try {
      const response = await updateChallenge({
        variables: {
          challengeId: challengeId,
        },
      });
      if (response.data?.updateChallengeStatus?.challenges) {
        notification.success({
          message: "Your challenge was successfully marked as done.",
        });
        if (response.data.updateChallengeStatus.notifications?.length) {
          response.data.updateChallengeStatus.notifications.forEach(notif => {
            notification.info({
              message: notif?.message,
              duration: 0,
              onClose: () => updateNotification(),
            });
          });
        }
      }
    } catch (err: any) {
      console.log(err);
      notification.error({
        message: "Oops, there was a problem with your request.",
      });
    }
  };

  useEffect(() => {
    if (personalChallengeValues.data?.getPersonalChallenges?.challenges) {
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
  }, [personalChallengeValues.data?.getPersonalChallenges?.challenges]);
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
