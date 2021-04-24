import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";

import Dashboard from './components/dashboard';
import Auth from './components/auth/Auth';

const App = () => {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Auth />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
