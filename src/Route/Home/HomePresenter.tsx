import React from "react";
import Clock from "../../Components/Clock";
import { Helmet } from "react-helmet";

const HomePresenter = () => (
  <>
    <Helmet>
      <title>Home | Mamabal</title>
    </Helmet>
    <Clock />
  </>
);

export default HomePresenter;
