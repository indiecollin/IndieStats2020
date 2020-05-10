import React, { useEffect } from 'react';
import styled from 'styled-components';
import PowerRanks from '../components/HomePowerRanks.jsx';
import FeaturedTournaments from '../components/HomeFeaturedTournaments.jsx';
import NewsFlash from '../components/HomeNewsFlash.jsx';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const HomeContainer = styled.main`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;  
  padding-top: 90px;
  min-height: calc(100vh);

  &>div{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));    
    row-gap: 36px;
    column-gap: 20px;
    margin: 0 auto;    
    max-width: 940px;
  }

  @media screen and (max-width: 480px) {
    &>div{
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));      
      row-gap: 20px;
    }
  }
`;

const Home = () => {
    return(
        <HomeContainer>
          <div>
            <PowerRanks/>
            <FeaturedTournaments/>
            <NewsFlash/>
          </div>
          <ScrollToTopOnMount/>
        </HomeContainer>
    )
}

export default Home;
















