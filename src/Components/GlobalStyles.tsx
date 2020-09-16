import { createGlobalStyle } from "../typed-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Kosugi&display=swap');
  ${reset}
  * {
    font-family: 'Kosugi', sans-serif;
  }
`;

export default GlobalStyles;
