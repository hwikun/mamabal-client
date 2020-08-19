import React from "react";
import Router from "./Router";
import { ThemeProvider } from "../typed-components";
import theme from "../theme";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
