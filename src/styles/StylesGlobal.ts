import { createGlobalStyle } from 'styled-components';

export const StylesGlobal = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        list-style: none;
        text-decoration: none;
    }

    html, body{
      height: 100%;
    }

    body {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow-x: hidden;
    }

    body.active-sidebarCar {
      overflow: hidden;
    }


    @media only screen and (max-width: 768px) {
      body.active-mobile {
        overflow: hidden;
      }
    }

`;
