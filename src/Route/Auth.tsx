import React from "react";
import { Helmet } from "react-helmet";
import AuthFrom from "../Components/AuthFrom";
import SocialLogin from "../Components/SocialLogin";

const Auth = () => {
  return (
    <>
      <Helmet>
        <title>Login | Mamabal</title>
      </Helmet>
      <AuthFrom />
      <SocialLogin />
    </>
  );
};
export default Auth;
