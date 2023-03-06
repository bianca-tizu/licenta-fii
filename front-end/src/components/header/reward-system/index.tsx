import React, { useState } from "react";

import "./reward-system.css";
import { useCookies } from "react-cookie";
import RewardSystemPresentation from "./reward-not-joined/reward-system-presentation";

const RewardSystem = ({ setOpenTutorial, setIsRewardSystemVisible }) => {
  const [cookies, setCookie] = useCookies(["reward"]);

  return (
    <>
      {cookies.reward ? (
        <>{/* pagina in care isi vede progresul */}</>
      ) : (
        <RewardSystemPresentation
          setIsRewardSystemVisible={setIsRewardSystemVisible}
          setOpenTutorial={setOpenTutorial}
        />
      )}
    </>
  );
};

export default RewardSystem;
