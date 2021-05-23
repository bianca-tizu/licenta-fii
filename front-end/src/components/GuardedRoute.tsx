import React from 'react';
import { useCookies } from "react-cookie";
import { Route, Redirect } from "react-router-dom";

//TO DO: User shouldn't be able to access dashboard without the login
const GuardedRoute = ({ component: Component, ...rest }: any) => {
    const [cookies,setCookie,removeCookie] = useCookies(["cookieId"]);

    console.log(cookies)
    const isAuth = cookies.get("cookieId");

    return <Route {...rest} render={(props) => (
        isAuth
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
}

export default GuardedRoute;