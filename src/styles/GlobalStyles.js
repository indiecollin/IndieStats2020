import {createGlobalStyle} from 'styled-components';
import backgroundImage from '../../public/assets/players.jpg';

const backgroundOverlayPrimary = 'rgba(255, 255, 255, 0.801)';
const backgroundOverlaySecondary = 'rgba(216, 216, 216, 0.801)';

export default createGlobalStyle`
    body{//should i put this on id = app instead?
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        background-image: linear-gradient(${() => backgroundOverlayPrimary + ', ' + backgroundOverlaySecondary + '), url(' + backgroundImage });
        background-size: cover;
        background-position: center;
        background-attachment: fixed;        
    }

    *,*::after,*::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit; 
    }

    input {
        box-sizing: border-box; 
    }

    button{
        border: none;
        background-color: unset;
        outline: none;
    }

    html {
        width: 100vw;
        overflow-x: hidden; 
    }

    body {
        box-sizing: border-box; 
    }

    .preload * {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -ms-transition: none !important;
        -o-transition: none !important;
    }

    #app{
        visibility: visible !important;
    }

    .slide-exit{
        transform: translate(-100%);
    }
    
    .slide-exit-active {
        transform: translate(0%);            
        transition: transform 300ms linear;        
    }

`;