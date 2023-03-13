import { Button, Image } from "antd";

import HelloRewardGIF from "../../../../assets/hello_reward.gif";
import "./reward-system-presentation.css";

const RewardSystemPresentation = ({
  setOpenTutorial,
  setIsRewardSystemVisible,
}) => {
  const handleJoinReward = async () => {
    setOpenTutorial(true);
    setIsRewardSystemVisible(false);
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
          <p>
            Challenges are events in which players unlock features by completing
            a group of related tasks.
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
    </>
  );
};

export default RewardSystemPresentation;
