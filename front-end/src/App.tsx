import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
  
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client';

import Dashboard from './components/dashboard';
import Auth from './components/auth/Auth';
import GuardedRoute from './components/GuardedRoute';
  
import './App.css';
import { CookiesProvider } from "react-cookie";

// const authMiddleware = (authToken: any) => {
//   new ApolloLink((operation, forward) => {
//     if (authToken) {
//       operation.setContext({
//         headers: {
//           authorization: `Bearer ${authToken}`
//         }
//       })
//     }
//     return forward(operation)
//   })
// }
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    credentials: 'include'
});

const App = () => {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path='/'>
                <Auth />
              </Route>
              {/* TO DO: User shouldn't be able to access dashboard without the login
              <GuardedRoute path="/dashboard" component={Dashboard}/> */}
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    </CookiesProvider>
  );
}

export default App;
