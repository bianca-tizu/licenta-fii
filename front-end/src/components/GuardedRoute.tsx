import React from "react";
import { Route, Redirect } from "react-router-dom";

//TO DO: User shouldn't be able to access dashboard without the login
const GuardedRoute = ({ component: Component, ...rest }: any) => {
  const token = sessionStorage.getItem("token");
  console.log(token);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default GuardedRoute;
