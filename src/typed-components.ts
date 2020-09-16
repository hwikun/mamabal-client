import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

type IThemeInterface = {
  blueColor: String;
};

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
