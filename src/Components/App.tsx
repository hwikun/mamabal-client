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
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        <Loader />
      )}
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
