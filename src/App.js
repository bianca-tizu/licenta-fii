import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Header from './components/header/Header';
import Login from './components/auth/login/Login';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
