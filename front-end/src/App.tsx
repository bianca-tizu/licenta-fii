import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";

import Dashboard from './components/dashboard';
import Auth from './components/auth/Auth';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
