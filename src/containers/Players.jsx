import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PlayerList from '../components/PlayerList.jsx';
import HubCard from '../components/HubCard.jsx';
import Expander from '../components/Expander.jsx';
import PlayerDetailsStats from '../components/PlayerDetailsStats.jsx';
import PlayerDetailsTournaments from '../components/PlayerDetailsTournaments.jsx';
import PlayerDetailsRivals from '../components/PlayerDetailsRivals.jsx';

const PlayersContainer = styled.main`    
    min-height: 100vh;    
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;    

    @media screen and (max-width: 706px) {        
      flex-flow: column;
    }
`;

const PlayerInfo = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) repeat(3, minmax(320px, 0.8fr));
  
  row-gap: 20px;
  flex-wrap: wrap;
  justify-items: center;  
  position: relative;
  margin: 90px auto auto auto;
  min-width: 320px;
  transition: height 0.5s linear;

  &>div:last-child{
    grid-column: 2;
    display: none;
  }

  @media screen and (max-width: 1360px) {  
    grid-template-columns: minmax(0, 1.05fr) repeat(1, minmax(320px, 0.8fr));
    padding-left: 300px;
  }

  @media screen and (max-width: 1180px) {
    grid-template-columns: 1fr;
    margin-top: 102px;
    margin-left: 40px;
    padding-left: unset;
    display: flex;
    flex-direction: column;
    height: ${props => props.expanded ? '1172px' : '308px'};

    &>div:not(:last-child){
      ${props => props.expanded ? '' : 'top: 0;'}
    }

    &>div:last-child{
      display: block;
      position: relative;
      margin-top: auto;
      transition: margin 0.5s linear;
    }
  }

  @media screen and (max-width: 706px) {
    margin-top: 12px;
    margin-left: auto;
  }
`;

const PlayerDetails = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) repeat(3, minmax(320px, 0.8fr));
  min-width: 500px;
  margin: 20px auto;

  @media screen and (max-width: 1360px) {
    grid-template-columns: 1fr;
    flex-basis: 100%;
    margin-left: 300px;    
    padding-right: 8px;
    &>div{
      grid-column: 1 / -1;
    }    
  }

  @media screen and (max-width: 1180px) {
    margin-left: auto;
  }

  @media screen and (max-width: 500px) {
    min-width: unset;
    margin: 20px 0;
  }
`;

const Players = (props) => {
  let { selected } = useParams();  
  const [expanded, setExpanded] = useState(true);
  const [infoMode, setInfoMode] = useState('');
  const [player, setPlayer] = useState({});
  const [listing, setListing] = useState([]);
  const [tagProps, setTagProps] = useState({});
  const selectMode = (expanded, infoMode) =>{
    setExpanded(expanded);
    setInfoMode(infoMode);
  }  

  useEffect(() => {
    axios.all([axios.get('http://localhost:9001/api/players/powerRanks'),
    axios.get('http://localhost:9001/api/players/listing/')])
    .then(axios.spread((ranks, players ) => {
      const tagDict = players.data.reduce((acc, cur) => {
        if(cur.icon || cur.iconColor || cur.tagColor){
          acc[cur.gamerTag] = Object.assign({}, {icon: cur.icon, iconColor: cur.iconColor, badgeColor: cur.badgeColor});
        }
        return acc;
      }, {});      
      const urlPlayerIndex = selected ? players.data.findIndex(p => p.gamerTag.toLowerCase() === decodeURIComponent(selected).toLowerCase()) : -1;    
      setTagProps(tagDict);
      setPlayer(urlPlayerIndex > 0 ? players.data[urlPlayerIndex] : ranks.data[0]);
      setListing(players.data);
    }));
  }, []);
                  

  return <PlayersContainer>
    <PlayerList setPlayer = {setPlayer} players = {listing}/>
    <PlayerInfo expanded = {expanded}>
      <HubCard type = 'player' player = {player} grid = '3 / 4' responsiveGrid = '1/2' onClick = {() => setExpanded(!expanded)}/>
      <HubCard type = 'stats' player = {player} grid = '2 / 3' responsiveGrid = '2/3' onClick = {() => selectMode(false, 'stats')}/>
      <HubCard type = 'tournaments' player = {player} grid = '3 / 4' responsiveGrid = '1/2' onClick = {() => selectMode(false,'tournaments')}/>
      <HubCard type = 'rivals' player = {player} grid = '4 / 5' responsiveGrid = '2/3' onClick = {() => selectMode(false,'rivals')}/>
      <Expander expanded = {expanded} onClick = {() => setExpanded(!expanded)}/>         
    </PlayerInfo>
    <PlayerDetails>
      {infoMode === 'stats' ? <PlayerDetailsStats player = {player}/> : null}
      {infoMode === 'tournaments' ? <PlayerDetailsTournaments player = {player}/> : null}
      {infoMode === 'rivals' ? <PlayerDetailsRivals player = {player} setPlayer = {setPlayer} tagProps = {tagProps}/>: null}
    </PlayerDetails>        
  </PlayersContainer>
};

export default Players;