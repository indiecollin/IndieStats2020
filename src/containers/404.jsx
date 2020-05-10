import React, { useEffect } from 'react';
import styled from 'styled-components';

function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return null;
  };

const Http404Container = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;

    h1{
        font-size: 96px;
    }

    span{        
        font-size: 22px;
        font-weight: 500;
        text-align: center;
    }


    iframe{
       max-width: 100vw;
       margin: 32px 0;
    }

    @media screen and (max-width: 706px){
        padding: 40px;        
        span{
            font-size: 18px;
        }
    }     
`;

const Http404 = () => {
    return(
        <Http404Container>
            <h1>404</h1>
            <iframe src='https://gfycat.com/ifr/ForcefulUnfortunateIridescentshark' frameBorder='0' scrolling='no' allowFullScreen width='640' height='404'></iframe><p> <a href="https://gfycat.com/forcefulunfortunateiridescentshark-super-smash-brothers-ultimate-fire-emblem"></a></p>
            <span>Looks Like You Got Sent To The Shadow Realm!</span>            
            <ScrollToTopOnMount/>
        </Http404Container>
    )
}

export default Http404;