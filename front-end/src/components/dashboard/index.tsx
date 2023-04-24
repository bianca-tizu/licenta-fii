import React from "react";
import QuestionsList from "./questions-list";
import PageBanner from "./pageBanner/PageBanner";
import { QuestionsProvider } from "../../contexts/QuestionsProvider";

import "./dashboard.css";
import Tour from "../header/reward-system/tour/tour";
import {
  useCheckAndUpdateSystemChallengesStatusQuery,
  useUpdateNotificationStatusMutation,
} from "../../generated/graphql";
import { notification } from "antd";

const Dashboard = () => {
  const [isDraftVisible, setIsDraftVisible] = React.useState(false);
  const [openTutorial, setOpenTutorial] = React.useState(false);

  const { data } = useCheckAndUpdateSystemChallengesStatusQuery();
  const [updateNotification] = useUpdateNotificationStatusMutation();

  React.useEffect(() => {
    if (data?.checkAndUpdateSystemChallengesStatus) {
      data.checkAndUpdateSystemChallengesStatus.forEach(notif => {
        notification.info({
          message: notif,
          duration: 0,
          onClose: () => updateNotification(),
        });
      });
    }
  }, [data?.checkAndUpdateSystemChallengesStatus]);

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
