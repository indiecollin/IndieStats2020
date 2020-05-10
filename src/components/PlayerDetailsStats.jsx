import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import theme from '../styles/Theme';
import SmashBallIcon from './svgs/SmashBallIcon.jsx';

const header = '#850303';//maroon
const rowHeader = '#434343';//grey
const iconDims = 28;

const StatDetails = styled.div`
    grid-column: 2 / 5;
    display: flex;
    flex-direction: column;
    align-items: center;     
    margin: 0 auto 20px;
    max-width: 500px;
    width: 100%;
    height: 320px;    
    padding-right: 24px;
    overflow-y: scroll;   
    
    *{
        font-family: sans-serif;
    }

    span{
        font-size: 24px;
        font-weight: 700;
    }       

    &::-webkit-scrollbar-track
    {        
        border-radius: 10px;
        background-color: ${props => props.theme.scrollbarPrimary};
    }

    &::-webkit-scrollbar
    {
        width: 12px;
        background-color: ${props => props.theme.scrollbarPrimary};
    }

    &::-webkit-scrollbar-thumb
    {
        border-radius: 10px;        
        background-color: ${props => props.theme.scrollbarSecondary};
        border-left: 2px solid ${props => props.theme.scrollbarPrimary};
        border-right: 2px solid ${props => props.theme.scrollbarPrimary};
    }

    @media screen and (max-width: 1180px) {
        grid-column: 1 / -1;
    }

    @media screen and (max-width: 706px){
        width: 100%;
        margin: 0 8px;        
        padding-right: 4px;
        margin: 20px 0;
    } 
`;

const StatDetailsHeader = styled.div`
    display: flex;
    align-items: center;    
    width: 476px;
    background-color: ${header};
    color: ${props => props.theme.white};
    margin: 0 auto;
    padding: 8px 0;
    border-radius: 8px;

    svg{                
        margin-left: 12px;
        margin-right: 20px;
    }

    @media screen and (max-width: 706px){
        width: 300px;
        margin-left: auto;
    }
`;

const StatDetailsRow = styled.div`    
    display: flex;                                  
    width: 476px; 
    background-color: ${props => props.theme.white};    
    margin: 8px auto 0;
    border-radius: 20px;

    div{
        font-weight: 550;
        font-size: 18px;
        border-radius: 20px 0 0 20px;
        padding: 8px;
    }

    div:first-child{            
        background-color: ${rowHeader};
        color: ${props => props.theme.white};
        width: 47%;
        clip-path: polygon(0% 0%, 0 100%, 95% 100%, 100% 0%);
    }

    div:last-child{
        color: ${rowHeader};
        margin: 0 8px 0 auto;
        max-width: 53%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    @media screen and (max-width: 706px){
        width: 300px;
        margin-left: auto;
    }
`;

const PlayerDetailsStats = (props) => {
    const [stats, setStats] = useState({});
    useEffect(() => {
        axios.all([ 
            axios.get('http://localhost:9001/api/players/tournamentsAttended/' + encodeURIComponent(props.player.gamerTag)),
            axios.get('http://localhost:9001/api/players/avgPlacement/' + encodeURIComponent(props.player.gamerTag)),
            axios.get('http://localhost:9001/api/players/avgSeed/' + encodeURIComponent(props.player.gamerTag)),
            axios.get('http://localhost:9001/api/players/mostLosses/' + encodeURIComponent(props.player.gamerTag))                                     
        ])
        .then(axios.spread((tournamentsAttended, avgPlacement, avgSeed, mostLosses) => {
            setStats({
                avgPlacement: avgPlacement.data.avgPlacement,
                avgSeed: avgSeed.data.avgSeed,
                tournaments: tournamentsAttended.data.count,
                mostLosses: mostLosses.data.player
            });
        }));
    },[props.player]);
    return <StatDetails>
        <StatDetailsHeader>
            <SmashBallIcon dims = {iconDims} fill={theme.white}/>
            <span>Stats</span>
        </StatDetailsHeader>                        
        <StatDetailsRow>
            <div>Set Record</div><div>{props.player.setWins + ' - ' + props.player.setLosses}</div>
        </StatDetailsRow>
        <StatDetailsRow>
            <div>Game Record</div><div>{props.player.gameWins + ' - ' + props.player.gameLosses}</div>
        </StatDetailsRow>
        <StatDetailsRow>
            <div>Avg Place</div><div>{stats.avgPlacement}</div>
        </StatDetailsRow>
        <StatDetailsRow>
            <div>Avg Seed</div><div>{stats.avgSeed}</div>
        </StatDetailsRow>
        <StatDetailsRow>
            <div>Tournaments</div><div>{stats.tournaments}</div>
        </StatDetailsRow>
        <StatDetailsRow>
            <div>Most Losses</div><div>{stats.mostLosses}</div>
        </StatDetailsRow>                                
    </StatDetails>
};

export default PlayerDetailsStats;