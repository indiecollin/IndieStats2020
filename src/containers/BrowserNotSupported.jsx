import React from 'react';
import styled from 'styled-components';
import chrome from '../../public/assets/chrome.png';
import firefox from '../../public/assets/firefox.png';
import safari from '../../public/assets/safari.png';
import edge from '../../public/assets/edge.png';
import opera from '../../public/assets/opera.png';

const BrowserNotSupportedContainer = styled.main`
    visibility: visible;    
    width: 100vw;
    display: flex;
    flex-direction: column;    
    align-items: center;
    margin-top: 100px;

    a{
        height: 100px;
        margin-right: 20px;
        &:hover img{
            background-color: lightblue;
            border-radius: 8px;
        }
    }
`;

const BrowserNotSupported = () => {
    return(
        <BrowserNotSupportedContainer>
            <h1>Browser Not Supported</h1>            
            <div>
                <a href='https://www.google.com/chrome/'><img src={chrome}></img></a>
                <a href='https://www.mozilla.org/en-US/exp/firefox/new/'><img src={firefox}></img></a>
                <a href='https://support.apple.com/downloads/safari'><img src={safari}></img></a>
                <a href='https://www.microsoft.com/en-us/edge'><img src={edge}></img></a>
                <a href='https://www.opera.com/download'><img src={opera}></img></a>
            </div>
            <h3>Please visit indiestats.gg using one of the browsers above!</h3>            
        </BrowserNotSupportedContainer>
    )
}

export default BrowserNotSupported;