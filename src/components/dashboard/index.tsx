import React from 'react';
import QuestionsList from './questions-list';
import Header from '../header/Header';

import './dashboard.css';

const Dashboard = () => {
    return(
        <div className="dashboard">
            <Header />
            <div className="question-list">
                <QuestionsList />
            </div>
        </div>
    );
}

export default Dashboard;