import React from "react";
import QuestionsList from "./questions-list";
import PageBanner from "./pageBanner/PageBanner";
import { QuestionsProvider } from "../../contexts/QuestionsProvider";

import "./dashboard.css";
import Tour from "../header/reward-system/tour/tour";

const Dashboard = () => {
  const [isDraftVisible, setIsDraftVisible] = React.useState(false);
  const [openTutorial, setOpenTutorial] = React.useState(false);

  return (
    <QuestionsProvider>
      {openTutorial && <Tour />}
      <PageBanner
        isDraftVisible={isDraftVisible}
        setIsDraftVisible={setIsDraftVisible}
        setOpenTutorial={setOpenTutorial}
      />
      <div className="question-list">
        <QuestionsList isDraftVisible={isDraftVisible} />
      </div>
    </QuestionsProvider>
  );
};

export default Dashboard;
