import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import Dashboard from "./components/dashboard";
import Auth from "./components/auth/Auth";
import GuardedRoute from "./components/GuardedRoute";

import "./App.css";
import { CookiesProvider } from "react-cookie";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = sessionStorage.getItem("token");
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
    <CookiesProvider>
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Auth />
              </Route>
              <GuardedRoute component={Dashboard} path="/dashboard" />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    </CookiesProvider>
  );
};

export default App;
