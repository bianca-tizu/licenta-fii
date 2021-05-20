import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";

import Dashboard from './components/dashboard';
import Auth from './components/auth/Auth';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include"
  }
});

const App = () => {
  return (
    <Provider value={client}>
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
    </Provider>
  );
}

export default App;
