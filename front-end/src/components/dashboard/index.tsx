import React from "react";
import QuestionsList from "./questions-list";
import PageBanner from "./pageBanner/PageBanner";
import { QuestionsProvider } from "../../contexts/QuestionsProvider";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <QuestionsProvider>
      <PageBanner />
      <div className="question-list">
        <QuestionsList />
      </div>
    </QuestionsProvider>
  );
};

export default Dashboard;
