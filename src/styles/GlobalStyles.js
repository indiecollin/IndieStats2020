import {createGlobalStyle} from 'styled-components';
import backgroundImage from '../../public/images/players.jpg';

const backgroundOverlayPrimary = 'rgba(255, 255, 255, 0.801)';
const backgroundOverlaySecondary = 'rgba(216, 216, 216, 0.801)';

export default createGlobalStyle`
    body{//shoudl i put this on id = app instead?
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        background-image: linear-gradient(${() => backgroundOverlayPrimary + ', ' + backgroundOverlaySecondary + '), url(' + backgroundImage });
        background-size: cover;
        background-position: center;
        background-attachment: fixed;        
    }
`;