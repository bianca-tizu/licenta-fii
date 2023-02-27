import React from "react";
import HelloRewardGIF from "../../../assets/hello_reward.gif";
import "./reward-system.css";
import { Image } from "antd";

const RewardSystem = () => {
  return (
    <div className="rewards-container">
      <Image src={HelloRewardGIF} alt="hello-gif" className="image-container" />
      <div className="description">
        <h3 className="title">
          Welcome to the Challenging Side of FII Networking!
        </h3>
        <p>
          The Challenging Side is nothing without your involvement. The more
          questions you ask, the more questions you answer, the more challenges
          you will unlock.
        </p>
        <p>So you want to join the dark side?</p>
      </div>

      {/* trebuie customizat butonul */}
      <button>Yes</button>
    </div>
  );
};

export default RewardSystem;
