import { Alert } from "antd";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import JoyRide from "react-joyride";
import { useJoinRewardSystemMutation } from "../../../../generated/graphql";

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
];

const Tour = () => {
  const [joinedRewardSystem] = useJoinRewardSystemMutation();
  const [_, setCookie] = useCookies(["reward"]);
  const [errors, setErrors] = useState(false);

  const handleJoyrideCallback = async data => {
    if (data.status === "finished" || data.status === "skipped") {
      const response = await joinedRewardSystem();
      if (response.data?.joinRewardSystem?.joinedRewardSystem) {
        setCookie(
          "reward",
          response.data?.joinRewardSystem?.joinedRewardSystem
        );
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
      {errors && <Alert message="Error Text" type="error" />}
    </>
  );
};
export default Tour;
