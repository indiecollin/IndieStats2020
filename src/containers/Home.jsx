import React from 'react';
import styled from 'styled-components';
import PowerRanks from '../components/HomePowerRanks.jsx';
import FeaturedTournaments from '../components/HomeFeaturedTournaments.jsx';
import NewsFlash from '../components/HomeNewsFlash.jsx';

const ranks = [
    {
      "gamerTag": "VoiD",
      "primary": "pichu3.png",
      "sponsor": "clg.png",
      "secondary": "daisy6.png",
      "tertiary": "roy5.png"
    },
    {
      "gamerTag": "Nicko",
      "primary": "shulk5.png",
      "secondary": "chrom7.png"
    },
    {
      "gamerTag": "ImHip",
      "primary": "olimar2.png",
      "secondary": "duck_hunt1.png",
      "tertiary": "inkling3.png"
    },
    {
      "gamerTag": "Eon",
      "primary": "fox3.png",
      "secondary": "pichu7.png"
    },
    {
      "gamerTag": "Larry Lurr",
      "primary": "falco3.png",
      "secondary": "fox3.png",
      "tertiary": "wolf4.png"
    }
  ];

const tournaments = [
  {
    "name": "FAD 100",
    "banner": "FAD96px.png",
    "date": "2020-03-30T00:00:00.000Z",
    "venue": "Fire & Dice",
    "complete": false
  },
  {
    "name": "FPF 100",
    "banner": "FPF96px.png",
    "date": "2020-03-31T00:00:00.000Z",
    "venue": "PlayLIVE Nation",
    "complete": false
  }
];

const articles = [
  {
    "thumbnail": "genesis5.jpg",
    "name": "A New God Is Born",
    "abstract": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis."
  },
  {
    "thumbnail": "newloc.jpg",
    "name": "Mega Smash Monday''s Big Move",
    "abstract": "Sem nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
  }
];

const pastOrFuture = false;//past means true

const HomeContainer = styled.div`
  min-height: 100vh;  
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 32px;

  &>div{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
    grid-gap: 20px;    
    margin: 0 auto;
    padding-top: 90px;
    max-width: 940px;
  }

`;

const Home = (props) => {
    return(
        <HomeContainer>
          <div>
            <PowerRanks ranks = {ranks}/>
            <FeaturedTournaments past = {pastOrFuture} tournaments = {tournaments}/>
            <NewsFlash articles = {articles}/>
          </div>
        </HomeContainer>
    )
}

export default Home;