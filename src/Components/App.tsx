import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../typed-components";
import theme from "../theme";
import GlobalStyles from "./GlobalStyles";
import { authService } from "../firebase";
import AppRouter from "./Router";
import Loader from "./Loader";

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<any | null>(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args: any) => user.updateProfile(args),
        });
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    if (user) {
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args: any) => user.updateProfile(args),
      });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        <Loader />
      )}
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
