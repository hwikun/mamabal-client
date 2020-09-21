import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Auth from "../Route/Auth";
import Navigation from "./Navigation";
import Profile from "../Route/Profile";
import Home from "../Route/Home";

interface IAppProps {
  isLoggedIn?: Boolean | null;
  userObj?: any | null;
}

const AppRouter: React.FC<IAppProps> = ({ isLoggedIn, userObj }) => (
  <BrowserRouter>
    {isLoggedIn && <Navigation />}
    <Switch>
      {isLoggedIn ? (
        <>
          <Route exact path="/">
            <Home userObj={userObj} />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </>
      ) : (
        <Route exact path="/">
          <Auth />
        </Route>
      )}
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
