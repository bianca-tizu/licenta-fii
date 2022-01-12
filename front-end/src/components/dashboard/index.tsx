import React from "react";
import QuestionsList from "./questions-list";
import PageBanner from "./pageBanner/PageBanner";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      <PageBanner />
      <div className="question-list">
        <QuestionsList />
      </div>
    </>
  );
};

export default Dashboard;
