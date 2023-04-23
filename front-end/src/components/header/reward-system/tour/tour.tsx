import { Alert, notification } from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";
import JoyRide from "react-joyride";
import {
  GetSystemChallengesDocument,
  useJoinRewardSystemMutation,
  useMapSystemChallengesToUserMutation,
} from "../../../../generated/graphql";

// Tour steps
const TOUR_STEPS = [
  {
    target: ".anticon-plus-circle",
    content: "Everytime you add a new question",
  },
  {
    target: ".ant-card",
    content: "or you answer to other questions",
  },
  {
    target: ".anticon-gift",
    content: "You will gain some points that can be tracked in this view.",
  },
  {
    target: ".question-list",
    content: "This points will unlock new challenges and new features for you.",
  },
  {
    target: ".anticon-gift",
    content: "Now check your first challenge here.",
  },
];

const Tour = () => {
  const [joinedRewardSystem] = useJoinRewardSystemMutation();
  const [mapSystemChallenges] = useMapSystemChallengesToUserMutation();
  const [, setCookie] = useCookies(["reward"]);
  const [errors, setErrors] = useState(false);

  const handleJoyrideCallback = async data => {
    if (data.status === "finished" || data.status === "skipped") {
      const response = await joinedRewardSystem();
      if (response.data?.joinRewardSystem?.joinedRewardSystem) {
        setCookie(
          "reward",
          response.data?.joinRewardSystem?.joinedRewardSystem
        );
        const { data } = await mapSystemChallenges({
          awaitRefetchQueries: true,
          refetchQueries: [{ query: GetSystemChallengesDocument }],
        });

        if (data?.mapSystemChallengesToUser?.notifications) {
          data?.mapSystemChallengesToUser?.notifications.forEach(message =>
            notification["info"]({
              message: message,
            })
          );
        }
      } else if (response.errors) {
        setErrors(true);
      }
    }
  };
  return (
    <>
      <JoyRide
        steps={TOUR_STEPS}
        callback={handleJoyrideCallback}
        continuous={true}
        disableCloseOnEsc={true}
        hideCloseButton={true}
        showProgress={true}
        showSkipButton={true}
      />
      {errors && <Alert message="Oops, there was a problem." type="error" />}
    </>
  );
};
export default Tour;
