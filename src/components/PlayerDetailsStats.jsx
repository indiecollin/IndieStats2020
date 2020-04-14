import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import SmashBallIcon from './svgs/SmashBallIcon.jsx';

const header = '#850303';//maroon
const rowHeader = '#434343';//grey
const iconDims = 28;

const StatDetails = styled.div`     
    grid-column: 2 / 5;
    margin: 0 auto 20px;
    max-width: 500px;
    width: 100%;
    height: 320px;
    padding-left: 24px;
    padding-right: 24px;
    overflow-y: scroll;   

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

    @media screen and (max-width: 1320px) {
        grid-column: 1 / -1;
    }

    @media screen and (max-width: 706px){
        width: 100%;
        margin: 0 8px;
        padding-left: 0;
        padding-right: 12px;
        margin: 20px 0;
    } 
`;

const StatDetailsHeader = styled.div`
    display: flex;
    align-items: center;
    background-color: ${header};
    color: ${props => props.theme.white};
    padding: 8px 0;
    border-radius: 8px;

    svg{                
        margin-left: 12px;
        margin-right: 20px;
    }

    @media screen and (max-width: 706px){
        //font-size: 16px;
        //padding: 8px 4px;
    }

`;

const StatDetailsRow = styled.div`    
    display: flex;                                   
    background-color: ${props => props.theme.white};
    //width: 95%;
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
        //font-size: 16px;
        //padding: 8px 4px;
    }

`;

const PlayerDetailsStats = (props) => {
    return <StatDetails>
        <StatDetailsHeader>
            <SmashBallIcon dims = {iconDims} fill={theme.white}/>
            <span>Stats</span>
        </StatDetailsHeader>                        
            <StatDetailsRow>
                <div>Set Record</div><div>{props.stats.setWins + ' - ' + props.stats.setLosses}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Game Record</div><div>{props.stats.gameWins + ' - ' + props.stats.gameLosses}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Average Place</div><div>{props.stats.avgPlacement}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Average Seed</div><div>{props.stats.avgSeed}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Tournaments</div><div>{props.stats.tournamentsAttended}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Most Losses</div><div>{props.stats.mostLosses}</div>
            </StatDetailsRow>            
            {/* <StatDetailsRow>
                <div>Set Record</div><div>{props.stats.setWins + ' - ' + props.stats.setLosses}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Game Record</div><div>{props.stats.gameWins + ' - ' + props.stats.gameLosses}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Average Place</div><div>{props.stats.avgPlacement}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Average Seed</div><div>{props.stats.avgSeed}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Tournaments</div><div>{props.stats.tournamentsAttended}</div>
            </StatDetailsRow>
            <StatDetailsRow>
                <div>Most Losses</div><div>{props.stats.mostLosses}</div>
            </StatDetailsRow>*/}
    </StatDetails>
};

export default PlayerDetailsStats;