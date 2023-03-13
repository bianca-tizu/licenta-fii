import { useCookies } from "react-cookie";

import RewardSystemPresentation from "./reward-not-joined/reward-system-presentation";
import ProgressView from "./progress-view/progress-view";

import "./reward-system.css";

const RewardSystem = ({ setOpenTutorial, setIsRewardSystemVisible }) => {
  const [cookies] = useCookies(["reward"]);

  return (
    <>
      {cookies.reward ? (
        <ProgressView />
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
