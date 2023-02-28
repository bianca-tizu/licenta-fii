import { Alert, Button, Image } from "antd";
import { useState } from "react";

import HelloRewardGIF from "../../../../assets/hello_reward.gif";
import { useJoinRewardSystemMutation } from "../../../../generated/graphql";

const RewardSystemPresentation = ({ setCookie }) => {
  const [joinedRewardSystem] = useJoinRewardSystemMutation();
  const [errors, setErrors] = useState(false);

  const handleJoinReward = async () => {
    const response = await joinedRewardSystem();
    if (response.data?.joinRewardSystem?.joinedRewardSystem) {
      setCookie("reward", response.data?.joinRewardSystem?.joinedRewardSystem);
    } else if (response.errors) {
      setErrors(true);
    }
  };

  return (
    <>
      <div className="rewards-container">
        <Image
          src={HelloRewardGIF}
          alt="hello-gif"
          className="image-container"
        />
        <div className="description">
          <h3 className="title">
            Welcome to the Challenging Side of FII Networking!
          </h3>
          <p>
            The Challenging Side is nothing without your involvement. The more
            questions you ask, the more questions you answer, the more
            challenges you will unlock.
          </p>
          <p>So you want to join the dark side?</p>
        </div>

        <Button
          type="dashed"
          className="confirmation-button"
          onClick={handleJoinReward}>
          Let's go!
        </Button>
      </div>
      {errors && <Alert message="Error Text" type="error" />}
    </>
  );
};

export default RewardSystemPresentation;
