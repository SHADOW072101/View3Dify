import { createGlobalStyle } from "styled-components";

// export const GlobalStyles = createGlobalStyle`
//   * {
//     padding: 0;
//     margin: 0;
//     box-sizing: border-box;
//     font-family: "Poppins", sans-serif;
//   }

//   body {
//     background : url('/images/img (4).jpg')center/cover no-repeat;
//     color: white;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     min-height: 100vh;
//   }

//   button, input, .file-label {
//     background: transparent;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     padding: 10px;
//     box-shadow: 5px 5px 7px #0c0c0e;
//     transition: 0.2s;
//   }

//   button:active {
//     box-shadow: inset 5px 5px 7px #0c0c0e, inset -5px -5px 7px #2e3036;
//   }
//      a {
//     text-decoration: none;
//     color: white;
//   }

//   a:hover {
//     text-decoration: underline;
//   }
// `;
// export default GlobalStyles;

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  body {
    position: relative;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background:url('/images/img (4).jpg') center/cover no-repeat;
    
  }

  // body::before {
  //   content: '';
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
    
  //   z-index: -1; /* Places it behind content */
  // }

  /* Rest of your styles remain unchanged */
  button, input, .file-label {
    background: transparent;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 5px 5px 7px #0c0c0e;
    transition: 0.2s;
  }

  button:active {
    box-shadow: inset 5px 5px 7px #0c0c0e, inset -5px -5px 7px #2e3036;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default GlobalStyles;