import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isExpired } from "react-jwt";

const GuardedRoute = ({ component: Component, ...rest }: any) => {
  const token = sessionStorage.getItem("token");
  const isTokenExpired = token && isExpired(token);

  return (
    <Route
      {...rest}
      render={(props) =>
        token && !isTokenExpired ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default GuardedRoute;
