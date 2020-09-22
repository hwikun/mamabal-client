import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "../Route/Auth";
import Navigation from "./Navigation";
import Profile from "../Route/Profile";
import Home from "../Route/Home";

interface IAppProps {
  isLoggedIn?: Boolean | null;
  userObj?: any | null;
  refreshUser: any;
}

const AppRouter: React.FC<IAppProps> = ({
  refreshUser,
  isLoggedIn,
  userObj,
}) => (
  <BrowserRouter>
    {isLoggedIn && <Navigation userObj={userObj} />}
    <Switch>
      {isLoggedIn ? (
        <>
          <Route exact path="/">
            <Home userObj={userObj} />
          </Route>
          <Route exact path="/profile">
            <Profile userObj={userObj} refreshUser={refreshUser} />
          </Route>
          <Redirect from="*" to="/" />
        </>
      ) : (
        <>
          <Route exact path="/">
            <Auth />
          </Route>
          <Redirect from="*" to="/" />
        </>
      )}
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
