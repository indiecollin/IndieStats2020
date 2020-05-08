import React from 'react';
import styled from 'styled-components';
import PowerRanks from '../components/HomePowerRanks.jsx';
import FeaturedTournaments from '../components/HomeFeaturedTournaments.jsx';
import NewsFlash from '../components/HomeNewsFlash.jsx';

const articles = [
  {
    "thumbnail": "genesis5.jpg",
    "name": "A New God Is Born",
    "abstract": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis."
  },
  {
    "thumbnail": "newloc.jpg",
    "name": "Mega Smash Mondays Big Move",
    "abstract": "Sem nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
  }
];

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
      padding-top: 72px;//temp
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
            <NewsFlash articles = {articles}/>
          </div>
        </HomeContainer>
    )
}

export default Home;
















