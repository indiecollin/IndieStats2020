//MAY NEED TO USE STATE IN THIS COMPONENT TO HANDLE PAGING
import React from 'react';
import styled from 'styled-components';
import MSM from '../../public/images/MSM96px.png';
import First from '../../public/images/gold-medal.png';
import Second from '../../public/images/silver-medal.png';
import Third from '../../public/images/bronze-medal.png';

const highlightTheme = '#850303';

const TournamentDetails = styled.div`    
    min-width: 600px;//temp
    width: 608px;//temp
    min-height: 560px; 
    display: flex;
    flex-direction: column;

    /* @media screen and (max-width: 706px){
        min-width: unset;       
        padding: 0 8px;

        .players-tournaments-grid{
            grid-template-columns: minmax(180px, 1fr) minmax(140px, 1fr);  
            grid-template-rows: repeat(2, min-content) 88px;

            .banner{
                grid-row: 1;
                grid-column: 1 / -1;
                margin: 0 auto;
            }
    
            .name{grid-row: 2;}
    
            .top3{
                grid-row: 3;
                grid-column: 2 / 3;
                margin-right: 8px;
            }
    
            .player-info{            
                grid-row: 3;
                grid-column: 1 / 2;                           
                div{
                    margin-left: 0;     
                }             
                .metrics{max-width: 100px}
            }
        }
    }

    @media screen and (max-width: 480px){
        max-width: 360px;
        margin: 0 auto;
        padding: 0;
    } */
`;

const TournamentListing = styled.div`        
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    grid-template-columns: 208px 1fr 1fr;
    grid-template-rows: min-content 1fr;        
    background-color: ${props => props.theme.black};
    margin-bottom: 4px;
    border-top: 1.5px solid ${() => highlightTheme};
    border-bottom: 1.5px solid ${() => highlightTheme};
    cursor: pointer;

    img{
        grid-row: 2 / 3;
        padding: 8px;
    }
    &>span{
        grid-column: 1 / -1;           
        justify-self: center; 
        color: ${props => props.theme.white};
        font-weight: 550;
    }        
`;

const PlayerInfo = styled.div`    
    grid-column: 2 / 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: ${props => props.theme.black};
    
    span:first-child{
        display: inline-block;//should it just me a different element instead of forcing a span to be block?s
        background-color: ${() => highlightTheme};
        color: ${props => props.theme.white};   
        width: 80px;        
        height: 100%;   
        clip-path: polygon(0% 0%, 0 100%, 90% 100%, 100% 0%);
    }
    span:last-child{
        color: ${() => highlightTheme};
        display: inline-block;
        width: 120px;
        height: 100%;
        text-align: center;  
        font-weight: 550; 
    }            
`;

const Top3 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;            
    color: ${props => props.theme.white};
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    margin: 4px 40px 4px 0;            
    
    div{
        display: flex;
        background-color: ${() => highlightTheme};
        align-items: center;
        height: 24px;//didn't need this before, weird

        img{
            width: 24px;
            height: 24px;
        }
        span{

        }        
    }   

    div:first-child{
        clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 85% 0%);
    }
    
    div:last-child{
        clip-path: polygon(0% 0%, 0% 100%, 85% 100%, 100% 0%);
    }
    
`;
//can be it's own component
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
    background-color: ${props => props.page === props.index+1 ? highlightTheme : props.theme.black};
    border: none;
    outline: none;        
    cursor: ${props => props.page === props.index+1 ? 'default' : 'pointer'};        
    
    &:hover{
        background-color: ${() => highlightTheme};
    }

    &:first-child{
        margin: 0;
    }
`;

const PlayerDetailsTournaments = (props) => {
    return(
        <TournamentDetails>
            {props.tournaments.map((t, i) => {
                return <TournamentListing key = {i}>
                    <img src = {MSM}/>
                    <span>{t.name}</span>
                    <PlayerInfo>
                        <div><span>Place</span><span>{t.placement}</span></div>
                        <div><span>Record</span><span>{t.wins + ' - ' + t.losses}</span></div>
                        <div><span>Loss To</span><span>{t.loser ? t.loser: '-----'}</span></div>
                        <div><span>Eliminator</span><span>{t.eliminator ? t.eliminator: '-----'}</span></div>
                    </PlayerInfo>
                    <Top3>
                        <div><img src = {First}/><span></span>{t.top3[0]}</div>
                        <div><img src = {Second}/><span></span>{t.top3[1]}</div>
                        <div><img src = {Third}/><span></span>{t.top3[2]}</div>
                    </Top3>
                </TournamentListing>                
            })}
            <Pagination>
                    {[...Array(5)].map((x,i) => <PaginationButton key = {i} index = {i} page={props.page}></PaginationButton>)}
            </Pagination>
        </TournamentDetails>
    );
};

export default PlayerDetailsTournaments;