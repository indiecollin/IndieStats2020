import React, {Component} from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import ClearX from './ClearX.jsx';
import BadgeIcon from '../../public/images/badge-icon0.png';

const portraitHeader = '#00000C';
const playerIcon = '#FE0000';
const playerBackground = '#993130';
const rivalIcon = '#0068EB';
const rivalBackground = '#3878A4';
const rivalBackgroundHover = '#6594B3';
const matchWin = 'rgba(41, 153, 41, 0.808)';
const matchLoss = 'rgba(192, 80, 60, 0.801)';
const statsTranslucent = 'rgba(70, 67, 67, 0.685)';


const SmashTagColors = [
    '#F33906',
    '#FF7E09',
    '#FFCA0A',
    '#72AE12',
    '#005C27',
    '#0048C1',
    '#299DE6',
    '#FF7A7D',
    '#7E41B8',
    '#4C350B',
    '#E1E1E1',
    '#0D0D0D'    
];

const randomTagColor = (gamerTag) => {
    //some logic
    return SmashTagColors[0];
}

const rivalSearchClearXPos = {
    top: '16.5px',
    right: '16.5px'
}

const matchHistoryClearXPos = {
    top: '12px',
    right: '12px'
}

const RivalDetails = styled.div`            
    grid-column: 2 / 5;    
    display: grid;
    grid-template-columns: 180px 1fr;
    max-height: 452px;
    margin: 0 auto 20px;    

    /* @media screen and (max-width: 1276px){
        padding: 0 20px;      
    }
    
    @media screen and (max-width: 1000px){
        grid-template-columns: 160px 1fr;    
        
        .rivals-listing .rival-tag{
            width: 140px;
            .wins, .gamer-tag{
                font-size: 14px;
            }
        }

        .rivals-info .rivals-stats-wrapper .portraits .portrait-header .player-icon{
            font-size: 16px;      
            width: unset;
            margin-left: 4px;  
        }

        .rivals-info .rivals-stats-wrapper .portraits .portrait-header .portrait-tag{
            font-size: 28px;
            margin-left: 16px; 
        }
    }
    
    @media screen and (max-width: 706px){
        padding: 0; 
        margin: 0;
        max-height: unset;   

        .rivals-listing{
            grid-column: 1 / -1;
            padding: 0;
            margin-bottom: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .rival{
                display: flex;
                justify-content: space-evenly;
                flex-flow: row wrap;
                overflow: hidden;
                max-height: 76px;
            }

            input[type=text]{width: 50%;}

            svg{            
                right: 25.5%;
                top: 3px;
            }

            .rival-tag{
                height: 68px;
                padding: 8px 0 0;

                .avatar-background{
                    height: 32px;
                    margin-left: 8px;
                    .avatar{
                        width: 32px;
                    }
                }

                .wins{
                    margin-top: 14px;
                    margin-left: 3px;
                    margin-right: 0;                                                
                    width: 52px;                    

                    span{
                        margin-right: 2px;
                    }
                }

                .gamer-tag{
                    margin-left: 8px;
                    max-width: 90px; 
                }

            }
        }

        .rivals-info{
            grid-column: 1 / -1;

            .rivals-stats-wrapper .portraits .portrait-header .portrait-tag{margin-left: 0;}
        }
    }     */
`;

const RivalsListing = styled.div`
    padding: 12px 12px 12px 0;
    grid-column : 1 / 2;
    position: relative;
    width: inherit;        

    input[type=text]{    
        width: 100%;
        &::-webkit-input-placeholder {
            text-align: center;
        }       
    }    
    
    /* @include clear-x;
    svg{            
        right: 14.5px;
        top: 14.5px;
    } */     
`;

const RivalTag = styled.div`
    display: flex;        
    flex-wrap: wrap;        
    position: relative;    
    margin-top: 8px;
    padding-top: 4px;
    padding-right: 4px;;
    padding-bottom: 4px;
    padding-left: 12px;            
    border: solid ${props => props.theme.black};
    border-radius: 28px;
    border-width: 4px 8px;
    cursor: pointer;
    color: ${props => props.theme.white};                        
    background: linear-gradient(${props => 'to bottom, ' + props.theme.white + ' 30%, ' + randomTagColor(props.gamerTag) + ' 30%, ' + randomTagColor(props.gamerTag) + ' 100%'});

    &::before{
        top: 12px;
        left: -8px;
        position: absolute;
        content: '';
        background-color: ${props => props.theme.white};
        border: solid ${props => props.theme.black};                
        border-width: 11px 3.5px;
        border-radius: 50%;                
        width: 10px;
        height: 10px; 
    }

    img{
        background-color: darkolivegreen;//fix
        border-radius: 4px;
        height: 36px;                
    }

    div{
        margin-top: 16px;
        margin-left: 8px;
        margin-right: 8px;
        flex-grow: 1;
        text-align: right;
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: 12px;

        span{
            margin-right: 4px;
        }
    }
    
    &>span{
        flex-basis: 100%;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;                    
    }
`;

const RivalInfo = styled.div`    
    grid-column : 2 / 3;     
    width: 760px;//temp         

    &>div{  
        display: grid; 
        grid-template-rows: 24px 428px;          
        text-align: center;   
        flex-direction: column;                          
    }
`;

const Portraits = styled.div`
        grid-row: 1 / 3;
        grid-area: 1 / 1 / 3 / 2;
        display: flex;
        justify-content: space-around; 
`;

const Portrait = styled.div`
    width: 50%;
    position: relative;
    cursor: ${props => props.player ? 'default' : 'pointer'};                

    img{        
        max-width: 100%;
        max-height: 100%;
        background-color: ${props => props.player ? playerBackground : rivalBackground};
        ${props => !props.player ? '&:hover{background-color: ' + rivalBackgroundHover + '};' : ''}
    }    
`;

const PortraitSpacer = styled.div`
    width: 100%;
    height: 24px;
    background-color: ${props => props.theme.darkGrey};
`;

const PortraitHeader = styled.div`
    max-width: 380px;
    width: 100%;
    display: flex;
    position: absolute;
    margin-top: -16px;
    transform: skewY(-2deg);                                    
    background-color: ${() => portraitHeader};

    span:first-child{
        font-size: 20px;
        font-weight: 800;
        text-transform: uppercase;    
        width: 40px;
        color: ${props => props.player ? playerIcon : rivalIcon};
    }

    span:last-child{
        font-size: 32px;
        font-weight: 800;
        text-transform: uppercase;
        color: ${props => props.theme.white};
        margin-left: 28px;   
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: -webkit-fill-available;             
    }
`;

const RivalStats = styled.div`
    grid-area: 1 / 1 / 3 / 2;                
    z-index: 100;      
    height: max-content;  
    width: 320px; 
    justify-self: center;
    margin: auto 0;
    color: ${props => props.theme.white};        
`;

const StatsListing = styled.div`
    background-color: ${() => statsTranslucent}; 

    div{
        display: flex;
         
        span:last-child{                            
            margin-right: auto; 
        }
    }
`;

const StatHeader = styled.span`
    width: ${props => props.width};
    margin: ${props => '0 0 0 ' + props.marginLeft};
`;

const MatchHistory = styled.div`
    margin-top: 20px;        
    grid-area: 2 / 1 / 3 / 2;        
    position: relative;      
    overflow-y: scroll;        
    width: 320px;
    max-height: 300px;
    justify-self: center;
    background-color: ${() => statsTranslucent}; 
    color: ${props => props.theme.white};
    min-height: 300px;    
    
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
`;

const MatchHistoryHeader = styled.div`
    display: flex;     
    justify-content: space-around; 
    margin-top: 8px;

    span{
        font-size: 16px;
        font-weight: 700;
    }

    input[type=text]{  
        &::-webkit-input-placeholder {
            text-align: center;
        }        
    }  
    

    /* @include clear-x;
    svg{
        top: 10.5px;
        right: 16px;
    } */     
`;

const MatchListings = styled.div`                                       
    padding-bottom: 16px;    
`;

const Match = styled.div`
    margin: 0 8px;
    background-color: ${props => props.win ? matchWin : matchLoss};

    &>span{
        display: block;
        margin-top: 8px;
    }        

    div{
        display: flex;
        justify-content: space-evenly;
        margin: 8px 64px 0;
    }
`;

class PlayerDetailsRivals extends Component{
    constructor(props){
        super(props);
        this.state = {
            playerPortrait: '',
            rivalPortrait: ''
        };
    }

    componentDidMount(){
        import(/* webpackMode: "eager" */ `../../public/rival_portraits/${this.props.player.main}.png`).then(playerImg => {
            this.setState({playerPortrait: playerImg.default});
        });

        import(/* webpackMode: "eager" */ `../../public/rival_portraits/${this.props.rival.main}.png`).then(rivalImg => {
            this.setState({rivalPortrait: rivalImg.default});
        });
    }

    render(){    
        return(
            <RivalDetails>
                <RivalsListing rivals = {this.props.rivals}>
                    <input type="text" placeholder='Search Rivals'/>
                    <ClearX visible = {true} position = {rivalSearchClearXPos}/>
                    <div>  
                        {this.props.rivals.map(rival => {
                            return <RivalTag>
                                <img src={BadgeIcon}></img>                            
                                <div><span>{(rival.wins === 1 ? (rival.wins + ' Win'): (rival.wins + ' Wins'))}</span></div>
                                <span key = {rival.gamerTag}>{rival.gamerTag}</span>
                            </RivalTag>
                        })}   
                    </div>
                </RivalsListing>
                <RivalInfo>
                        <div>
                            <Portraits>
                                <Portrait player = {true}>
                                    <PortraitSpacer/>
                                    <PortraitHeader player={true}>
                                        <span>P1</span>
                                        <span>{this.props.player.gamerTag}</span>
                                    </PortraitHeader>
                                    <img src={this.state.playerPortrait}/>
                                </Portrait>
                                <Portrait>
                                    <PortraitSpacer/>
                                    <PortraitHeader>
                                        <span>P2</span>
                                        <span>{this.props.rival.gamerTag}</span>
                                    </PortraitHeader>
                                    <img src={this.state.rivalPortrait}/>
                                </Portrait>
                            </Portraits>
                            <RivalStats>
                                <StatsListing>
                                    <div>
                                        <StatHeader width = {'100px'} marginLeft = {'68px'}>Set Record:</StatHeader>
                                        <span>{this.props.rival.setWins + ' - ' + this.props.rival.setLosses}</span>
                                    </div>
                                    <div>
                                        <StatHeader width = {'120px'} marginLeft = {'48px'}>Game Record:</StatHeader>
                                        <span>{this.props.rival.gameWins + ' - ' + this.props.rival.gameLosses}</span>
                                    </div>
                                    <div>
                                        <StatHeader width = {'100px'} marginLeft = {'66px'}>Highest Set:</StatHeader>
                                        <span>{this.props.rival.highestTournament + ' For ' + this.props.rival.highestPlacement }</span>
                                    </div>
                                    <div>
                                        <StatHeader width = {'80px'} marginLeft = {'86px'}>Last Met:</StatHeader>
                                        <span>{this.props.rival.lastMet}</span>
                                    </div>
                                </StatsListing>
                                <MatchHistory>
                                    <MatchHistoryHeader>
                                        <span>Match History</span>
                                        <input type="text" placeholder='Search Tournaments'/>
                                        <ClearX visible = {true} position = {matchHistoryClearXPos}/>
                                    </MatchHistoryHeader>
                                    <MatchListings>
                                        {this.props.matchHistory.map(match => {
                                            return <Match win = {match.win}>
                                                <span>{match.tournamentName}</span>
                                                <span>{match.title}</span>  
                                                <div>
                                                    <span>{match.playerScore}</span>
                                                    <span>-</span>
                                                    <span>{match.rivalScore}</span>  
                                                </div>
                                            </Match>
                                        })}
                                    </MatchListings>
                                </MatchHistory>
                            </RivalStats>
                        </div>
                </RivalInfo>
            </RivalDetails>
        );
    };
};

export default PlayerDetailsRivals;