import React from "react";
import QuestionsList from "./questions-list";
import VerticalMenu from "../header/VerticalMenu";
import PageBanner from "./pageBanner/PageBanner";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <VerticalMenu />
      <div className="question-list">
        <QuestionsList />
      </div>
    </div>
  );
};

export default Dashboard;
