import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
    body{
        background-color: lightblue;
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
    }

    h1{
        color: navy;
        width: max-content;
        margin: 40px auto 0;
    }
`;