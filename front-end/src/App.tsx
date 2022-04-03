import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import Dashboard from "./components/dashboard";
import Auth from "./components/auth/Auth";
import GuardedRoute from "./components/GuardedRoute";

import "./App.css";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
});

const authLink = setContext(async (req, { headers }) => {
  console.log(headers);
  // get the authentication token from local storage if it exists
  const authToken = await sessionStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <GuardedRoute component={Dashboard} exact path="/dashboard" />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
