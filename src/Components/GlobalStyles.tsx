import { createGlobalStyle } from "../typed-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Kosugi&display=swap');
  ${reset}
  * {
    font-family: 'Kosugi', sans-serif;
    box-sizing: border-box;
  }
  #root {
    padding: 20px 5%;
    display:flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default GlobalStyles;
