import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

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

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
});

const authLink = setContext(async (req, { headers }) => {
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

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    const authToken = sessionStorage.getItem("token");

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions?.code) {
          case "UNAUTHENTICATED":
            const headers = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...headers,
                authorization: authToken ? `Bearer ${authToken}` : "",
              },
            });
            return forward(operation);
          case "BAD_USER_INPUT":
            console.log("OOPS");
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
    console.log("Other type of error");
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
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
