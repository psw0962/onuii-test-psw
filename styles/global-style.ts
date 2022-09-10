import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  /* body width 이상 */
  @media (min-width: 1201px) {
    html {
      font-size: 10px;
    }
  }

  /* body width */
  @media screen and (max-width: 1200px) {
    html {
      font-size: 0.833vw;
    }
  }

  @media screen and (max-width: 520px) {
    html {
      font-size: 2vw;
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
