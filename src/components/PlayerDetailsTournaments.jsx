import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import First from '../../public/assets/gold-medal.png';
import Second from '../../public/assets/silver-medal.png';
import Third from '../../public/assets/bronze-medal.png';

const background = '#B3CFDD'
const highlightTheme = '#043C63';
const pageLimit = 5;

const TournamentDetails = styled.div`    
    grid-column: 2 / 5;    
    display: flex;
    flex-direction: column;        
    margin: 0 auto 20px;

    @media screen and (max-width: 1180px){
        grid-column: 1 / -1;
    }
`;

const TournamentListing = styled.div`        
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(3, minmax(200px, 1fr));    
    grid-template-columns: 208px 1fr 152px;
    grid-template-rows: min-content 1fr;        
    background-color: ${background};
    margin-bottom: 4px;
    border-top: 1.5px solid ${highlightTheme};    
    cursor: pointer;

    &>img{
        grid-row: 2 / 3;
        padding: 8px;
    }
    &>div{
        border: none;
    }
    &>span{
        grid-column: 1 / -1;           
        justify-self: center; 
        color: ${props => '#043c63'};
        font-weight: 550;
    }        

    @media screen and (max-width: 706px){        
        grid-template-columns: minmax(180px,1fr) minmax(140px,152px);
        grid-template-rows: repeat(2, min-content) 88px;

        &>img{
            grid-row: 1;
            grid-column: 1 / -1;
            margin: 0 auto;
        }

        &>span{
            grid-row: 2;
        }
    }
`;

const PlayerInfo = styled.div`    
    grid-column: 2 / 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: ${background};
    
    span:first-child{
        display: inline-block;//should it just me a different element instead of forcing a span to be block?s
        background-color: ${highlightTheme};
        color: ${props => props.theme.white};   
        width: 80px;        
        height: 100%;   
        clip-path: polygon(0% 0%, 0 100%, 90% 100%, 100% 0%);
    }
    span:last-child{
        color: ${highlightTheme};
        display: inline-block;
        width: 120px;
        height: 100%;
        text-align: center;  
        font-weight: 550; 
    }

    @media screen and (max-width: 706px){
        grid-row: 3;
        grid-column: 1 / 2;                           
        div{
            margin-left: 0;     
        }
        span:last-child{
            max-width: 100px;
        }
    }         
`;

const Top3 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;            
    color: ${props => props.theme.white};
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    margin: 4px 8px 4px 0;            
    
    div{
        display: flex;
        background-color: ${highlightTheme};
        align-items: center;
        clip-path: polygon(0% 0%, 0% 100%, 90% 100%, 100% 0%);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;        

        img{
            width: 24px;
            height: 24px;
        }   
    }           
    
    @media screen and (max-width: 706px){
        grid-row: 3;
        grid-column: 2 / 3;
        margin-right: 8px;
    }

    @media screen and (max-width: 480px){
        div{
            clip-path: unset;
        }        
    }

`;
//can be its own component
const Pagination = styled.div`        
    align-self: center;
    display: flex;   
    width: 55%;
    margin-top: auto;    
`;

const PaginationButton = styled.button`
    width: inherit;
    height: 10px;
    margin-left: 4px;  
    background-color: ${props => props.page === props.index+1 ? highlightTheme : background};    
    border: none;
    outline: ${props => props.page === props.index+1 ? 'none': '1px solid #043c63'};        
    cursor: ${props => props.page === props.index+1 ? 'default' : 'pointer'};        
    
    &:hover{
        background-color: ${highlightTheme};
    }

    &:first-child{
        margin: 0;
    }
`;

const PlayerDetailsTournaments = (props) => {
    const [tournaments, setTournaments] = useState([]);
    const [banners, setBanners] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        axios.get('http://localhost:9001/api/players/tournaments/' + encodeURIComponent(props.player.gamerTag))
        .then(res => {
            let imports = res.data.tournaments.map(t => import(/* webpackMode: "eager" */ `../../public/tournament_banners/${t.shortName.split(' ')[0]}96px.png`));
            Promise.all(imports).then(images => {                
                setBanners(images.map(banner => banner.default));
            });
            setTournaments(res.data.tournaments);
        });
    },[props.player]);

    const selectTournament = (tournament) => {
        props.history.push({pathname: '/tournaments/' + tournament.replace(' ', '-')});
    };
    
    return <TournamentDetails>
        {tournaments
            .filter((t,i) => i >= ((page - 1) * pageLimit) && i < (page) * pageLimit )//pagination filtering
            .map((t, i) => {
                return <TournamentListing key = {i} onClick = {() => selectTournament(t.shortName)}>
                    <img src = {banners[i]}/>
                    <span>{t.name}</span>
                    <PlayerInfo>
                        <div><span>Place</span><span>{t.placement}</span></div>
                        <div><span>Record</span><span>{t.wins + ' - ' + t.losses}</span></div>
                        <div><span>Loss To</span><span>{t.loser ? t.loser: '-----'}</span></div>
                        <div><span>Eliminator</span><span>{t.eliminator ? t.eliminator: '-----'}</span></div>
                    </PlayerInfo>
                    <Top3>
                        <div><img src = {First}/>{t.top3[0]}</div>
                        <div><img src = {Second}/>{t.top3[1]}</div>
                        <div><img src = {Third}/>{t.top3[2]}</div>
                    </Top3>
                </TournamentListing>                
            })
        }
        {
           tournaments.length> pageLimit ?
            <Pagination>
                {[...Array(Math.ceil(tournaments.length/pageLimit))].map((x,i) => <PaginationButton key = {i} onClick = {() => setPage(i+1)} page={page} index = {i}></PaginationButton>)}
            </Pagination>
            :
            null
        }
    </TournamentDetails> 
};

export default withRouter(PlayerDetailsTournaments);