import React, { useState } from "react";

import "./reward-system.css";
import { useCookies } from "react-cookie";
import RewardSystemPresentation from "./reward-not-joined/reward-system-presentation";

const RewardSystem = () => {
  const [cookies, setCookie] = useCookies(["reward"]);
  const [openTutorial, setOpenTutorial] = useState(false);

  return (
    <>
      {cookies.reward ? (
        <>{/* pagina in care isi vede progresul */}</>
      ) : (
        <RewardSystemPresentation
          setCookie={setCookie}
          setOpenTutorial={setOpenTutorial}
        />
      )}
    </>
  );
};

export default RewardSystem;
