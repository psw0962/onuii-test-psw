import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 2.2vw;
  }

  @media screen and (min-width: 450px) {
    html {
      font-size: 10px;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input, textarea {
    /* ios 인풋 입력 */
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
`;

export default GlobalStyle;
