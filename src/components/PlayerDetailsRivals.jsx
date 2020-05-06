import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ordinal from '../helpers/ordinal';
import ClearX from './ClearX.jsx';
import BadgeIcon0 from '../../public/smash_tag_icons/badge-icon0.png';
import BadgeIcon1 from '../../public/smash_tag_icons/badge-icon1.png';
import BadgeIcon2 from '../../public/smash_tag_icons/badge-icon2.png';
import BadgeIcon3 from '../../public/smash_tag_icons/badge-icon3.png';
import BadgeIcon4 from '../../public/smash_tag_icons/badge-icon4.png';
import BadgeIcon5 from '../../public/smash_tag_icons/badge-icon5.png';
import BadgeIcon6 from '../../public/smash_tag_icons/badge-icon6.png';
import BadgeIcon7 from '../../public/smash_tag_icons/badge-icon7.png';
import BadgeIcon8 from '../../public/smash_tag_icons/badge-icon8.png';
import BadgeIcon9 from '../../public/smash_tag_icons/badge-icon9.png';
import BadgeIcon10 from '../../public/smash_tag_icons/badge-icon10.png';
import BadgeIcon11 from '../../public/smash_tag_icons/badge-icon11.png';
import BadgeIcon12 from '../../public/smash_tag_icons/badge-icon12.png';
import BadgeIcon13 from '../../public/smash_tag_icons/badge-icon13.png';
import BadgeIcon14 from '../../public/smash_tag_icons/badge-icon14.png';
import BadgeIcon15 from '../../public/smash_tag_icons/badge-icon15.png';
import BadgeIcon16 from '../../public/smash_tag_icons/badge-icon16.png';
import BadgeIcon17 from '../../public/smash_tag_icons/badge-icon17.png';
import BadgeIcon18 from '../../public/smash_tag_icons/badge-icon18.png';
import BadgeIcon19 from '../../public/smash_tag_icons/badge-icon19.png';

const badgeIcons = [
    BadgeIcon0,BadgeIcon1,BadgeIcon2,BadgeIcon3,BadgeIcon4,
    BadgeIcon5,BadgeIcon6,BadgeIcon7,BadgeIcon8,BadgeIcon9,
    BadgeIcon10,BadgeIcon11,BadgeIcon12,BadgeIcon13,BadgeIcon14,
    BadgeIcon15,BadgeIcon16,BadgeIcon17,BadgeIcon18,BadgeIcon19
];

const portraitHeader = '#00000C';
const playerIcon = '#FE0000';
const playerBackground = '#993130';
const rivalIcon = '#0068EB';
const rivalBackground = '#3878A4';
const rivalBackgroundHover = '#6594B3';
const matchWin = 'rgba(41, 153, 41, 0.808)';
const matchLoss = 'rgba(192, 80, 60, 0.801)';
const statsTranslucent = 'rgba(70, 67, 67, 0.685)';

const badgeColors = [
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

const iconColors = [
    '#E0381E',
    '#5E5858',
    '#3973B2',
    '#EEB30D',
    '#E37C05',
    '#359DC4',
    '#146CFF',
    '#95C90D',
    '#F999C9',
    '#8583B4',
    '#469961',
    '#994137',
    '#E43D8F',
    '#87CBB2',
    '#D73533',
    '#F0E28A'
];

const rivalSearchClearXPos = {
    top: '15.5px',
    right: '15.5px'
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

    @media screen and (max-width: 1360px){
        grid-template-columns: 160px 1fr;        
    }

    @media screen and (max-width: 1180px){
        
    }        
    
    @media screen and (max-width: 706px){
        padding: 0; 
        margin: 0;
        max-height: unset;   
    }    
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

    @media screen and (max-width: 706px){
        grid-column: 1 / -1;
        padding: 0;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &>div{
            display: flex;
            justify-content: space-evenly;
            flex-flow: row wrap;
            overflow: hidden;
            max-height: 76px;
        }

        input[type=text]{width: 50%;}

        button{            
            right: 25.5%;
            top: 3px;
        }
    }    
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
    background: linear-gradient(${props => 'to bottom, ' + props.theme.white + ' 30%, ' + props.getBadgeColor(props.gamerTag) + ' 30%, ' + props.getBadgeColor(props.gamerTag) + ' 100%'});
    *{
        font-family: sans-serif;
    }

    &::before{        
        top: 14px;
        left: -6px;
        position: absolute;
        content: '';
        background-color: ${props => props.theme.white};
        border: solid ${props => props.theme.black};                
        border-width: 11px 3.5px;
        border-radius: 50%;                
        width: 16px;
        height: 32px; 
    }

    img{
        background-color: ${props => props.getIconColor(props.gamerTag)};
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

    @media screen and (max-width: 1360px){
        width: 140px;
        div, div > span{
            font-size: 14px;
        }        
    }

    @media screen and (max-width: 706px){
        height: 68px;
        padding: 8px 0 0;

        img{
            width: 32px;
            height: 32px;
            margin-left: 8px;
        }

        div{
            margin-top: 14px;
            margin-left: 3px;
            margin-right: 0;                                                
            width: 52px;                    

            span{
                margin-right: 2px;
            }
        }

        &>span{
            margin-left: 8px;
            max-width: 90px; 
        }
    }

`;

const RivalInfo = styled.div`    
    grid-column : 2 / 3;     
    //width: 760px;//temp         

    &>div{  
        display: grid; 
        grid-template-rows: 24px 428px;          
        text-align: center;   
        flex-direction: column;                          
    }

    @media screen and (max-width: 706px){
        grid-column: 1 / -1;
    }

`;

const Portraits = styled.div`
    grid-row: 1 / 3;
    grid-area: 1 / 1 / 3 / 2;
    display: flex;
    justify-content: space-around; 

    @media screen and (max-width: 1360px){
        max-width: 680px;
    }
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
    
    *{
        font-family: sans-serif;
    }

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

    @media screen and (max-width: 1180px){

        span:first-child{
            font-size: 16px;      
            width: unset;
            margin-left: 4px;  
        }

        span:last-child{
            font-size: 28px;
            margin-left: 16px;
        }
    }

    @media screen and (max-width: 706px){
        span:last-child{            
            margin-left: 0;
        }
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
`;

const MatchListings = styled.div`                                       
    padding-bottom: 16px;    
    a{
        text-decoration: none;
    }
`;

const Match = styled.div`
    margin: 0 8px;    
    background-color: ${props => props.win ? matchWin : matchLoss};
    color: ${props => props.theme.white};

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

const rivalsLimit = 5;

class PlayerDetailsRivals extends Component{
    constructor(props){
        super(props);
        this.state = {            
            playerPortrait: '',
            rivalPortrait: '',
            rivals: [],
            rival: {},
            matchHistory: [],
            rivalQuery: '',
            matchQuery: '',            
        };

        this.selectPlayer = this.selectPlayer.bind(this);
        this.searchRivals = this.searchRivals.bind(this);
        this.clearRivalSearch = this.clearRivalSearch.bind(this);
        this.searchMatches = this.searchMatches.bind(this);
        this.clearMatchSearch = this.clearMatchSearch.bind(this);
        this.selectRival = this.selectRival.bind(this);        
        this.getRivalData = this.getRivalData.bind(this);
        this.getBadgeColor = this.getBadgeColor.bind(this);
        this.getIconColor = this.getIconColor.bind(this);
        this.getBadgeIcon = this.getBadgeIcon.bind(this);
    }

    componentDidMount(){
        this.getRivalData(this.props.player, false, true);        
    }

    shouldComponentUpdate(prevProps){
        if(this.props.player.gamerTag !== prevProps.player.gamerTag){
            this.getRivalData(prevProps.player, false, true);
        }
        return true;
    }

    selectPlayer(rival){        
        this.props.setPlayer(rival);
    }

    searchRivals(e){
        this.setState({rivalQuery: e.target.value})
    }

    clearRivalSearch(){
        this.setState({rivalQuery: ''});
    }

    searchMatches(e){
        this.setState({matchQuery: e.target.value})
    }

    clearMatchSearch(){
        this.setState({matchQuery: ''});
    }

    selectRival(rival){
        this.getRivalData(this.props.player, rival, false);
        this.clearRivalSearch();
    }    

    getRivalData(player, rival, newPlayer){
        (newPlayer ? axios.get('http://localhost:9001/api/players/rivals/' + encodeURIComponent(player.gamerTag)) : Promise.resolve({data:{}}))
        .then(res => {            
            const rivals = res.data;
            if(newPlayer) this.setState({rivals: rivals});
            axios.all([
                axios.get('http://localhost:9001/api/players/matchHistory/' + encodeURIComponent(player.gamerTag) +'/' + encodeURIComponent(rival ? rival : rivals[0].gamerTag)),            
                axios.get('http://localhost:9001/api/players/player/' + encodeURIComponent(rival ? rival : rivals[0].gamerTag)),
                axios.get('http://localhost:9001/api/players/highestSet/' + encodeURIComponent(player.gamerTag) +'/' + encodeURIComponent(rival ? rival : rivals[0].gamerTag)),
                axios.get('http://localhost:9001/api/players/lastMet/' + encodeURIComponent(player.gamerTag) +'/' + encodeURIComponent(rival ? rival : rivals[0].gamerTag))
            ]).then(axios.spread((matchHistory, rival, highestSet, lastMet) => {                           
                import(/* webpackMode: "eager" */ `../../public/rival_portraits/${rival.data.mains ? rival.data.mains.split(',')[0] : 'default'}.png`).then(rivalImg => {
                    this.setState({rivalPortrait: rivalImg.default});
                });
                this.setState({
                    matchHistory: matchHistory.data,
                    rival: Object.assign({}, rival.data, {highestTournament: highestSet.data.tournament.shortName, highestPlacement: highestSet.data.placement, lastMet: lastMet.data[0].shortName}),                                        
                })
            }))      
        })
        if(newPlayer){
            import(/* webpackMode: "eager" */ `../../public/rival_portraits/${player.mains ? player.mains.split(',')[0] : 'default'}.png`).then(playerImg => {
                this.setState({playerPortrait: playerImg.default});
            });
        }        
    }

    getBadgeColor(gamerTag){
        return this.props.tagProps[gamerTag] ? badgeColors[this.props.tagProps[gamerTag].badgeColor] : badgeColors[gamerTag.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 12];
    }
    
    getIconColor(gamerTag){
        return this.props.tagProps[gamerTag] ?  iconColors[this.props.tagProps[gamerTag].iconColor] : iconColors[gamerTag.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 16];
    }
    
    getBadgeIcon(gamerTag){
        return this.props.tagProps[gamerTag] ?  badgeIcons[this.props.tagProps[gamerTag].icon] : badgeIcons[gamerTag.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 20];
    }

    determineMatchTitle(bracket, round, placement){          
        if(placement <= 2 ){//if a finals match
            if(placement == 2 && !bracket){
                return 'Losers Finals'
            }
            else if(placement == 2){
                return 'Winners Finals'
            }
            else if(placement == 1){
                return 'Grand Finals'
            }
            else{
                return 'Grand Finals Reset'
            }
        }
        else{
            return (bracket ? 'Winners ': 'Losers ') + 'Round ' + round + ' For '+ ordinal(placement);                
        }                 
    }

    render(){    
        return(
            <RivalDetails>
                <RivalsListing rivals = {this.state.rivals}>
                    <input type="text" value = {this.state.rivalQuery} onChange = {this.searchRivals} placeholder='Search Rivals'/>                    
                    <ClearX onClick = {() => this.clearRivalSearch()} visible = {this.state.rivalQuery} position = {rivalSearchClearXPos}/>
                    <div>  
                        {
                            this.state.rivals//filter before sort would be faster
                            .sort(this.state.rivalQuery ? ((r1, r2) => r1.gamerTag.toLowerCase() > r2.gamerTag.toLowerCase() ? 1 : -1) : () => 0) //alphabetical when typing
                            .filter(r => this.state.rivalQuery === '' || r.gamerTag.toLowerCase().startsWith(this.state.rivalQuery.toLowerCase()))                                                 
                            .map((r,i) => {
                                return <RivalTag key = {r.gamerTag} onClick = {() => this.selectRival(r.gamerTag)} gamerTag = {r.gamerTag} getIconColor = {this.getIconColor} getBadgeColor = {this.getBadgeColor}>
                                    <img src={this.getBadgeIcon(r.gamerTag)}></img>                            
                                    <div><span>{'Wins: ' + r.setWins}</span></div>
                                    <span>{r.gamerTag}</span>
                                </RivalTag>
                            }).slice(0, rivalsLimit)
                        }   
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
                                <Portrait onClick = {() => this.selectPlayer(this.state.rival)}>
                                    <Link to = {`/players/${encodeURIComponent(this.state.rival.gamerTag)}`}>
                                        <PortraitSpacer/>
                                        <PortraitHeader>
                                            <span>P2</span>
                                            <span>{this.state.rival.gamerTag}</span>
                                        </PortraitHeader>
                                        <img src={this.state.rivalPortrait}/>
                                    </Link>
                                </Portrait>
                            </Portraits>
                            <RivalStats>
                                <StatsListing>
                                    <div>
                                        <StatHeader width = {'100px'} marginLeft = {'68px'}>Set Record:</StatHeader>
                                        <span>{this.state.rival.setWins + ' - ' + this.state.rival.setLosses}</span>
                                    </div>
                                    <div>
                                        <StatHeader width = {'120px'} marginLeft = {'48px'}>Game Record:</StatHeader>
                                        <span>{this.state.rival.gameWins + ' - ' + this.state.rival.gameLosses}</span>
                                    </div>
                                    <div>
                                        <StatHeader width = {'100px'} marginLeft = {'66px'}>Highest Set:</StatHeader>
                                        <span>{this.state.rival.highestTournament + ' For ' + this.state.rival.highestPlacement }</span>
                                    </div>
                                    <div>
                                        <StatHeader width = {'80px'} marginLeft = {'86px'}>Last Met:</StatHeader>
                                        <span>{this.state.rival.lastMet}</span>
                                    </div>
                                </StatsListing>
                                <MatchHistory>
                                    <MatchHistoryHeader>
                                        <span>Match History</span>
                                        <input type="text" value = {this.state.matchQuery} onChange = {this.searchMatches} placeholder='Search Tournaments'/>
                                        <ClearX visible = {this.state.matchQuery} onClick = {() => this.clearMatchSearch()} position = {matchHistoryClearXPos}/>
                                    </MatchHistoryHeader>
                                    <MatchListings>
                                        {
                                            this.state.matchHistory
                                            .filter(mh => this.state.matchQuery === '' ||
                                                mh.tournamentName.toLowerCase().startsWith(this.state.matchQuery.toLowerCase()) || 
                                                mh.shortName.toLowerCase().startsWith(this.state.matchQuery.toLowerCase()))
                                            .sort((m1, m2) => m1.date != m2.date ? m1.date > m2.date ? -1 : 1 : m1.round > m2.round ? -1 : 1)// i hate nested ternaries
                                            .map(m => {
                                                const title = this.determineMatchTitle(m.bracket, m.round, m.placement);
                                                return <Link to = {`/tournaments/${m.shortName.replace(' ', '-')}`} key = {m.tournamentName + title}>
                                                    <Match win = {m.player1Score>m.player2Score} key = {m.tournamentName + title}>
                                                        <span>{m.tournamentName}</span>
                                                        <span>{title}</span>
                                                        <div>
                                                            <span>{m.player1Score}</span>
                                                            <span>-</span>
                                                            <span>{m.player2Score}</span>  
                                                        </div>
                                                    </Match>
                                                </Link>
                                            })
                                        }
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