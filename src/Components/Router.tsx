import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../Route/Home";
import Insta from "../Route/Insta";
import Youtube from "../Route/Youtube";

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/insta" component={Insta} />
      <Route path="/youtube" component={Youtube} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
