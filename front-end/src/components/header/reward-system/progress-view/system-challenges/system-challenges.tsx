import { Badge, Empty } from "antd";
import {
  Challenges,
  useGetSystemChallengesQuery,
} from "../../../../../generated/graphql";
import { useEffect, useState } from "react";

const SystemChallenges = () => {
  const [challenges, setChallenges] = useState<Challenges[]>([]);

  const { data, error } = useGetSystemChallengesQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getSystemChallenges?.challenges) {
      setChallenges(
        (data.getSystemChallenges.challenges as Challenges[]) ?? []
      );
    }
  }, [data?.getSystemChallenges?.challenges]);

  return (
    <>
      {challenges.length ? (
        challenges
          .filter(
            challenge =>
              challenge.status === "started" || challenge.status === "progress"
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
          })
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

export default SystemChallenges;
