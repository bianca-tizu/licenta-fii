import React from "react";
import "./reward-system.css";
import { useCookies } from "react-cookie";
import RewardSystemPresentation from "./reward-not-joined/reward-system-presentation";

const RewardSystem = () => {
  const [cookies, setCookie] = useCookies(["reward"]);

  return (
    <>
      {cookies.reward ? (
        <></>
      ) : (
        <RewardSystemPresentation setCookie={setCookie} />
      )}
    </>
  );
};

export default RewardSystem;
