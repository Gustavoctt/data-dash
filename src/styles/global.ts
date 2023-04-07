import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root{
  --white: #ffffff;
  --orange: #B54708;
  --yellow: #BABD6C;
  --green: #027a48;
  --red: #C11574;
  --blue: #2660A4;
  --gray-100: #fcfcfc; 
  --gray-200: #f7f7f7;
  --gray-300: #f3f6f9;
  --gray-700: #464e5f;
  --gray-800: #202024;

}
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    
  }

  html{
   background-color: #F2F2F2;
  }
`;
