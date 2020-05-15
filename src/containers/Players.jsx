import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PlayerList from '../components/players/PlayerList.jsx';
import HubCard from '../components/players/HubCard.jsx';
import PlayerDetailsStats from '../components/players/PlayerDetailsStats.jsx';
import PlayerDetailsTournaments from '../components/players/PlayerDetailsTournaments.jsx';
import PlayerDetailsRivals from '../components/players/PlayerDetailsRivals.jsx';
import Expander from '../components/Expander.jsx';
import Tooltip from '../components/Tooltip.jsx';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const PlayersContainer = styled.main`    
    min-height: 100vh;    
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;    

    @media screen and (max-width: 706px) {/*changes flex flow for vertical view*/      
      flex-flow: column;
    }
`;

const PlayerInfo = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(3, minmax(320px, 0.8fr));
  
  row-gap: 20px;
  flex-wrap: wrap;
  justify-items: center;  
  position: relative;
  margin: 90px auto auto auto;
  min-width: 320px;
  transition: height 0.5s linear;    

  @media screen and (max-width: 1360px) {/*adjusts grid for cards to be placed 2x2*/ 
    grid-template-columns: minmax(0, 1fr) repeat(1, minmax(320px, 0.8fr));
    padding-left: 300px;
  }

  @media screen and (max-width: 1180px) {/*adjusts grid for cards to be placed verticlly*/
    grid-template-columns: 1fr;
    margin-top: 82px;
    margin-left: 40px;
    padding-left: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${props => props.expanded ? '1172px' : '326px'};
    
    /*hub cards*/
    &>div:not(:last-child){
      ${props => props.expanded ? '' : 'top: 0;'}
    }    
  }

  @media screen and (max-width: 706px) {/*adjust spacing for mobile view*/
    margin-top: 12px;
    margin-left: auto;
  }
`;

const CardsTooltip = styled(Tooltip)`  
  display: none;/*hidden on desktop*/
  top: 24px;
  right: 16px;
  p{
    width: 84px;
    right: -12px;
    top: -60px;
    &:after{
      left: 79%;
    }
  }
  @media screen and (max-width: 1180px) {/*adjusts grid for cards to be placed verticlly*/
    display: block;
  }
`;

const CardsExpander = styled(Expander)`
  display: none;
  @media screen and (max-width: 1180px) {/*adjusts grid for cards to be placed verticlly*/
    display: flex;
    position: relative;
    margin-top: auto;
    transition: margin 0.5s linear;
  }
`;

const PlayerDetails = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(3, minmax(320px, 0.8fr));  
  margin: 20px auto;

  @media screen and (max-width: 1360px) {/*adjust spacing of details to accommodate PlayerInfo changing*/
    grid-template-columns: 1fr;
    flex-basis: 100%;
    margin-left: 300px;        
    &>div{
      grid-column: 1 / -1;
    }    
  }

  @media screen and (max-width: 1180px) {/*adjust spacing of details to accommodate PlayerInfo changing*/
    margin-left: auto;
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
    axios.all([axios.get('http://' + process.env.DOMAIN + '/api/players/powerRanks'),
    axios.get('http://' + process.env.DOMAIN + '/api/players/listing/')])
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
      <CardsTooltip>Click Cards For More Details</CardsTooltip>
      <HubCard type = 'player' player = {player} grid = '3 / 4' responsiveGrid = '1/2' onClick = {() => setExpanded(!expanded)}/>
      <HubCard type = 'stats' player = {player} grid = '2 / 3' responsiveGrid = '2/3' onClick = {() => selectMode(false, 'stats')}/>
      <HubCard type = 'tournaments' player = {player} grid = '3 / 4' responsiveGrid = '1/2' onClick = {() => selectMode(false,'tournaments')}/>
      <HubCard type = 'rivals' player = {player} grid = '4 / 5' responsiveGrid = '2/3' onClick = {() => selectMode(false,'rivals')}/>
      <CardsExpander expanded = {expanded} onClick = {() => setExpanded(!expanded)}/>         
    </PlayerInfo>
    <PlayerDetails>
      {infoMode === 'stats' ? <PlayerDetailsStats player = {player}/> : null}
      {infoMode === 'tournaments' ? <PlayerDetailsTournaments player = {player}/> : null}
      {infoMode === 'rivals' ? <PlayerDetailsRivals player = {player} setPlayer = {setPlayer} tagProps = {tagProps}/>: null}
    </PlayerDetails>        
    <ScrollToTopOnMount/>
  </PlayersContainer>
};

export default Players;