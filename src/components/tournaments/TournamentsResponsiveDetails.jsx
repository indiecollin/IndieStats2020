import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CaretIcon from '../svgs/CaretIcon.jsx';
import { matchIconStyles } from './TournamentsDetails.jsx';

const moreInfoText = '#FFE7DF';
const moreInfoBackground ='#E84035';
const moreInfoHeader = '#6E0C00';
const moreInfoPlacePrimary = '#E0D2B4';
const moreInfoPlaceSecondary = '#E2AC6B';
const moreInfoDataHeader = '#400D0C';
const moreInfoData = '#AC1B20';

const MobileDetails = styled.div`    
    display: none;/*hidden on desktop*/
    position: absolute;
    top: 0;           
    transition: margin .33s linear;                  
    width: 90%;    
    background-color: ${props => props.theme.black};
    color: ${moreInfoText};    
    margin-top: ${props => props.show ? '0' : '-440px'};/*negative margin to hide above table*/   
    grid-template-columns: 1fr 64px;     

    p{
        white-space: nowrap;                    
        user-select: none;                    
    }

    @media screen and (max-width: 960px){
        display: grid;/*visible*/
    }

    @media screen and (max-width: 480px){
        width: 100%;/*widen details for less clutter on mobile*/
    }
`;

const GamerTag = styled.span`
    color: ${props => props.theme.white};
    text-transform: uppercase;
    grid-row: 1;
    grid-column: 1;
    font-weight: 550;
    font-size: 32px;                    
    padding: 4px 0 8px 4px;
    width: unset;
    max-width: unset;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    a{
        text-decoration: none;
        color: inherit;
    }    
`;

const HeaderClip = styled.span`
    grid-row: 2;
    grid-column: 1;
    height: 36px;
    background-color: ${moreInfoBackground};
    clip-path: polygon(0% 0%, 0% 100%, 82.5% 100%, 90% 0%);
`;

const HeaderPadding = styled.span`
    grid-row: 3;
    grid-column: 1 / -1;
    height: 16px;
    background-color: ${moreInfoHeader};
`;
const Placement = styled.span`
    grid-row: 1 / 3;
    grid-column: 2;
    width: unset;
    font-weight: 550;
    font-size: ${props => props.placement>=100 ? '34px': '48px'};
    color: transparent;
    background: -webkit-linear-gradient(${'315deg, ' + moreInfoPlacePrimary + ' 0%, ' + moreInfoPlaceSecondary + ' 74%'});
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: auto;
    padding-right: 4px;
`;

const Details = styled.div`
    background-color: ${moreInfoBackground};
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        padding: 4px 12px 0;
`;

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
`;

const DetailsHeader = styled.span`
    background-color: ${moreInfoDataHeader};
    padding: 4px 0 4px 12px;
    font-weight: 550;
    font-size: 18px;
`;

const detailsInfoStyles = () => (`
    background-color: ${moreInfoData};
    padding: 4px;
    font-size: 22px;
    font-weight: 550;
`);

const DetailsInfo = styled.span`
    ${detailsInfoStyles()}
    ${props => props.clipped ? `clip-path: polygon(5% 100%, 100% 100%, 100% 0, 0 0); text-align: right;` : ''}
    a{
        text-decoration: none;
        color: inherit;
    }    
`;

const Matches = styled.div`
    display: flex;    
    ${detailsInfoStyles()}
    *{
        font-family: sans-serif;
    }
`;

const MatchIcon = styled.span`
    ${props => matchIconStyles(props)}
`;

const Collapser = styled.span`
    position: absolute;
    top: 90px;
    left: 50%;                    

    svg{
        width: 24px;
        height: 24px;
        fill: ${moreInfoBackground};
        stroke: ${moreInfoDataHeader};
        stroke-width: 20px;
        transform: rotate(-180deg);
        cursor: pointer;
        position: relative;
        visibility: visible;
        margin: unset;                        
    }
`;

const TournamentsResponsiveDetails = (props) =>{
    return <MobileDetails player = {props.player} show = {props.show}>
        <GamerTag>
            <Link to={`/players/${encodeURIComponent(props.player.gamerTag)}`}>{props.player.gamerTag}</Link>
        </GamerTag>
        <HeaderClip></HeaderClip>
        <HeaderPadding></HeaderPadding>
        <Placement placement = {props.player.placement}>{props.player.placement}</Placement>
        <Details>
            <DetailsWrapper>
                <DetailsHeader>Record</DetailsHeader>
                <DetailsInfo>{props.player.wins + ' - ' + props.player.losses}</DetailsInfo>
            </DetailsWrapper>
            <DetailsWrapper>
                <DetailsHeader>Matches</DetailsHeader>
                { props.player ? <Matches>{props.player.matches.split('').map((m,i) => <MatchIcon key = {i} win = {m == 'W'}>{m}</MatchIcon>)}</Matches> : null}
            </DetailsWrapper>
            <DetailsWrapper>
                <DetailsHeader>Seed</DetailsHeader>
                <DetailsInfo clipped = {true}>{props.player.seed}</DetailsInfo>
            </DetailsWrapper>
            <DetailsWrapper>
                <DetailsHeader>Loss To</DetailsHeader>
                <DetailsInfo clipped = {true}>
                    {props.player.loser ? <Link to={`/players/${encodeURIComponent(props.player.loser)}`}>{props.player.loser}</Link> : '-----' }
                </DetailsInfo>
            </DetailsWrapper>
            <DetailsWrapper>
                <DetailsHeader>Eliminator</DetailsHeader>
                <DetailsInfo clipped = {true}>
                    {props.player.eliminator ? <Link to={`/players/${encodeURIComponent(props.player.eliminator)}`}>{props.player.eliminator}</Link> : '-----' }                    
                </DetailsInfo>
            </DetailsWrapper>
        </Details>
        <Collapser onClick = {() => props.collapse()}><CaretIcon></CaretIcon></Collapser>
    </MobileDetails>
};

export default TournamentsResponsiveDetails;