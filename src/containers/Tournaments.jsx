import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TournamentsUpcoming from '../components/TournamentsUpcoming.jsx';
import TournamentsPast from '../components/TournamentsPast.jsx';
import TournamentsSearch from '../components/TournamentsSearch.jsx';
import TournamentsDetails from '../components/TournamentsDetails.jsx';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const TournamentsContainer = styled.main`   
    padding-top: 100px;
    margin: 0 auto;
    width: min-content;//crossbrowser logic safe
    max-width: 1268px;
    min-height: 100vh;

    @media screen and (max-width: 1300px){
      max-width: 888px;
    }

    @media screen and (max-width: 960px){
      max-width: 692px;
    }

    @media screen and (max-width: 706px){
      width: unset;
    }
`;

const TournamentsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(268px, 1fr) minmax(620px, 1fr) minmax(340px, 1fr);
  gap: 20px 20px;  
  margin-left: 3%;
  margin-right: 3%;

  @media screen and (max-width: 1300px) {            
        grid-template-columns: minmax(268px, 1fr) minmax(600px, 2fr);            
        margin: 0 auto;                      
        //padding-right: 20px;       
    }    

    @media screen and (max-width: 960px){
        grid-template-columns: 264px minmax(408px, 1fr);
        gap: 8px 20px;//subject to change
    }

    @media screen and (max-width: 706px){
        grid-template-columns: 1fr;         
    }
    @media screen and (max-width: 480px) {    
        display: flex;
        flex-direction: column;
    }
`;

const Tournaments = (props) => {
  const [query, setQuery] = useState('');
  const [tournament, setTournament] = useState({});
  let { selected } = useParams();  
  useEffect(()=>{        
    if(selected){
      axios.get('http://localhost:' +  process.env.IPORT + '/api/tournaments/events/?count=1&search=' + encodeURI(selected.replace('-', ' ')))
        .then(event => {
          if(event.data.tournaments.length){
            import(/* webpackMode: "eager" */ `../../public/tournament_banners/${event.data.tournaments[0].shortName.split(' ')[0]}96px.png`)
            .then(image => setTournament(Object.assign({}, event.data.tournaments[0], {banner: image.default})));
          }          
        });
    }
  },[])
  return <TournamentsContainer>
    <TournamentsGrid>
      <TournamentsUpcoming/>
      <TournamentsPast query = {query} setQuery = {setQuery} tournament = {tournament} setTournament = {setTournament}/>        
      <TournamentsDetails tournament = {tournament}/>        
    </TournamentsGrid>
    <TournamentsSearch setQuery = {setQuery}/>
    <ScrollToTopOnMount/>
  </TournamentsContainer>
};

export default Tournaments;