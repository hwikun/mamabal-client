import React from "react";
import { authService, firebaseInstance } from "../firebase";

const SocialLogin = () => {
  const onSocialClick = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    const {
      currentTarget: { name },
    } = event;
    let provider: any | undefined;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <button onClick={onSocialClick} name="google">
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
