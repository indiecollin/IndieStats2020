import React, {Component} from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ordinal from '../../helpers/ordinal';
import ClearX from '../ClearX.jsx';
import BadgeIcon0 from '../../../public/smash_tag_icons/badge-icon0.png';
import BadgeIcon1 from '../../../public/smash_tag_icons/badge-icon1.png';
import BadgeIcon2 from '../../../public/smash_tag_icons/badge-icon2.png';
import BadgeIcon3 from '../../../public/smash_tag_icons/badge-icon3.png';
import BadgeIcon4 from '../../../public/smash_tag_icons/badge-icon4.png';
import BadgeIcon5 from '../../../public/smash_tag_icons/badge-icon5.png';
import BadgeIcon6 from '../../../public/smash_tag_icons/badge-icon6.png';
import BadgeIcon7 from '../../../public/smash_tag_icons/badge-icon7.png';
import BadgeIcon8 from '../../../public/smash_tag_icons/badge-icon8.png';
import BadgeIcon9 from '../../../public/smash_tag_icons/badge-icon9.png';
import BadgeIcon10 from '../../../public/smash_tag_icons/badge-icon10.png';
import BadgeIcon11 from '../../../public/smash_tag_icons/badge-icon11.png';
import BadgeIcon12 from '../../../public/smash_tag_icons/badge-icon12.png';
import BadgeIcon13 from '../../../public/smash_tag_icons/badge-icon13.png';
import BadgeIcon14 from '../../../public/smash_tag_icons/badge-icon14.png';
import BadgeIcon15 from '../../../public/smash_tag_icons/badge-icon15.png';
import BadgeIcon16 from '../../../public/smash_tag_icons/badge-icon16.png';
import BadgeIcon17 from '../../../public/smash_tag_icons/badge-icon17.png';
import BadgeIcon18 from '../../../public/smash_tag_icons/badge-icon18.png';
import BadgeIcon19 from '../../../public/smash_tag_icons/badge-icon19.png';

const badgeIcons = [
    BadgeIcon0,BadgeIcon1,BadgeIcon2,BadgeIcon3,BadgeIcon4,
    BadgeIcon5,BadgeIcon6,BadgeIcon7,BadgeIcon8,BadgeIcon9,
    BadgeIcon10,BadgeIcon11,BadgeIcon12,BadgeIcon13,BadgeIcon14,
    BadgeIcon15,BadgeIcon16,BadgeIcon17,BadgeIcon18,BadgeIcon19
];

const rivalsLimit = 5;
const rivalTagWinsShadow = 'rgba(0, 0, 0, .25)'//'#00000040'
const portraitHeader = '#00000C';
const playerIcon = '#FE0000';
const playerBackground = '#993130';
const rivalIcon = '#0068EB';
const rivalBackground = '#3878A4';
const rivalBackgroundHover = '#6594B3';
const matchWin = 'rgba(41, 153, 41, .80)';
const matchWinHover = '#299929';
const matchLoss = 'rgba(192, 80, 60, .80)';
const matchLossHover = '#C0503C';
const statsTranslucent = '#464343B3';

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

const badgeHoverBase = '#ED8103';
const badgeHoverHighlight = '#FFFE01';

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

    @media screen and (max-width: 1360px){/*shrinks component and content for less clutter*/
        grid-template-columns: 160px 1fr;        
    }    
    
    @media screen and (max-width: 706px){/*stacks content and removes height restriction */
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

    @media screen and (max-width: 706px){/*stacks badges horizontally*/
        grid-column: 1 / -1;
        padding: 0;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &>div{
            display: flex;
            justify-content: space-around;            
            flex-flow: row wrap;
            overflow: hidden;
            max-height: 80px;

            @supports not (-ms-ime-align: auto) {
                justify-content: space-evenly;                
            }
        }

        input[type=text]{width: 50%;}        
    }    
`;

const RivalClearX = styled(ClearX)`
    top: 16.5px;
    right: 15.5px;    
    @media screen and (max-width: 706px){/*adjusts clearX spacing for mobile view*/
        top: 3.5px;
        right: 25.5%;
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

    &::before{/*chain hole*/
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

    &:hover::after{/*hover effect*/
        content: '';
        display: block;
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0;                    
        transform: scale(1.17, 1.25);        
        z-index: -200;
        border-radius: 28px;
        animation: tag-pulse 0.5s;
        animation-iteration-count: infinite;        

        @supports (-ms-ime-align:auto) {/*edge doesn't properly animate linear gradients*/
            background-color: ${badgeHoverHighlight};
            animation: none;
        }
    }

    @keyframes tag-pulse{        
        0%{background: linear-gradient(${'to right, ' + badgeHoverHighlight + ', ' + badgeHoverHighlight + ' 100%'});}
        13%{background: linear-gradient(${'to right, ' + badgeHoverBase + ', ' + badgeHoverHighlight +  ' 17%, ' + badgeHoverHighlight + ' 100%'});}
        26%{background: linear-gradient(${'to right, ' + badgeHoverBase + ', ' + badgeHoverBase + ' 17%, ' + badgeHoverHighlight +  ' 34%, ' + badgeHoverHighlight + ' 100%'});}
        39%{background: linear-gradient(${'to right, ' + badgeHoverBase + ', ' + badgeHoverBase + ' 34%, ' + badgeHoverHighlight +  ' 51%, ' + badgeHoverHighlight + ' 100%'});}
        52%{background: linear-gradient(${'to right, ' + badgeHoverBase + ', ' + badgeHoverBase + ' 51%, ' + badgeHoverHighlight +  ' 68%, ' + badgeHoverHighlight + ' 100%'});}
        65%{background: linear-gradient(${'to right, ' + badgeHoverBase + ', ' + badgeHoverBase + ' 68%, ' + badgeHoverHighlight +  ' 85%, ' + badgeHoverHighlight + ' 100%'});}                
        75%{background: linear-gradient(${'to right, ' + badgeHoverBase + ', ' + badgeHoverBase + ' 100%'});}        
        100%{background: linear-gradient(${'to right, ' + badgeHoverBase + ', ' + badgeHoverBase + ' 100%'});} 
        
    }                         

    img{/*rival tag icon image*/
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
        background-color: ${rivalTagWinsShadow};
        border-radius: 12px;

        span{/*wins*/
            margin-right: 4px;
        }
    }
    
    &>span{/*rival gamer tag*/
        flex-basis: 100%;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;                    
    }

    @media screen and (max-width: 1360px){/*shrink tag for less clutter*/
        width: 140px;

        &:hover::after{
            transform: scale(1.22, 1.25);
        }
        div, div > span{
            font-size: 14px;
        }        
    }

    @media screen and (max-width: 706px){/*adjust tags for horizontal stacking*/
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

    &>div{  
        display: grid; 
        grid-template-rows: 24px 428px;          
        text-align: center;   
        flex-direction: column;                          
    }

    @media screen and (max-width: 706px){/*stacks under rivals listing*/
        grid-column: 1 / -1;
    }

`;

const Portraits = styled.div`
    grid-row: 1 / 3;
    grid-area: 1 / 1 / 3 / 2;
    display: flex;
    justify-content: space-around;
    min-width: 760px;

    @media screen and (max-width: 1360px){/*shrinks portraits for less clutter*/
        max-width: 680px;
        min-width: unset;
    }

    @media screen and (max-width: 706px){/*allows for full screen width with stacking component*/
        min-width: 100vw;
    }     
`;

const Portrait = styled.div`
    width: 50%;
    position: relative;
    cursor: ${props => props.player ? 'default' : 'pointer'};               
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
    background-color: ${portraitHeader};
    z-index: 30;
    
    *{
        font-family: sans-serif;
    }

    span:first-child{/*player icon*/
        font-size: 20px;
        font-weight: 800;
        text-transform: uppercase;    
        width: 40px;
        color: ${props => props.player ? playerIcon : rivalIcon};
    }

    span:last-child{/*gamer tag*/
        font-size: 32px;
        font-weight: 800;
        text-transform: uppercase;
        color: ${props => props.theme.white};
        margin-left: 28px;   
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;            
    }

    @media screen and (max-width: 1180px){/*shrink for less clutter*/

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

    @media screen and (max-width: 706px){/*shrink for less clutter*/
        span:last-child{            
            margin-left: 0;
        }
    }

    @media screen and (max-width: 480px){/*shrink for less clutter*/
        span:first-child{
            font-size: 11px;  
            margin-left: 0;                
        }

        span:last-child{
            font-size: 18px;            
        }
    }

`;

const ImageWrapper = styled.div`        
    position: relative;
    min-height: 400px;    
    background: linear-gradient(to bottom, ${props => (props.player ? playerBackground : rivalBackground) + ', ' + (props.player ? playerBackground : rivalBackground)} 95%, transparent 100%);
    
    img{         
        max-width: 100%;
        max-height: 100%;       
        background-color: ${props => props.player ? playerBackground : rivalBackground};
        ${props => !props.player ? '&:hover{background-color: ' + rivalBackgroundHover + '};' : ''}        
        left: 0;
        z-index: 20;                
    }   
    
    @media screen and (max-width: 1360px){/*preload logic to give component form while awaiting data*/
        min-height: ${props => props.preLoad ? '356px' : 'unset'};
        min-width: ${props => props.preLoad ? '340px' : 'unset'};                
    }

    @media screen and (max-width: 900px){
        min-width: 276px;
    }        

    @media screen and (max-width: 706px){
        min-width: 100%;
    }        
`;

const RivalStats = styled.div`
    grid-area: 1 / 1 / 3 / 2;                
    position: relative;
    z-index: 100;      
    height: max-content;/*crossbrowser logic safe*/
    width: 320px; 
    justify-self: center;
    margin: auto 0;
    color: ${props => props.theme.white};            
`;

const StatsListing = styled.div`
    background-color: ${statsTranslucent}; 

    div{
        display: flex;
         
        span:last-child{/*stat values*/                    
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
    z-index: 50;
    overflow-y: scroll;        
    width: 320px;    
    height: 300px;
    justify-self: center;
    background-color: ${statsTranslucent}; 
    color: ${props => props.theme.white};
    
    &::-webkit-scrollbar-track{        
        border-radius: 10px;
        background-color: ${props => props.theme.scrollbarPrimary};
    }

    &::-webkit-scrollbar{
        width: 12px;
        background-color: ${props => props.theme.scrollbarPrimary};
    }

    &::-webkit-scrollbar-thumb{
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

    &:hover{
        background-color: ${props => props.win ? matchWinHover : matchLossHover};
    }

    &>span{
        display: block;
        margin-top: 8px;
    }        

    div{/*score*/
        display: flex;
        margin: 8px 64px 0;
        justify-content: space-between;

        @supports not (-ms-ime-align: auto) {
            justify-content: space-evenly;                
        }
    }
`;

class PlayerDetailsRivals extends Component{
    constructor(props){
        super(props);
        this.state = {            
            playerPortrait: '',
            rivalPortrait: '',
            rivals: [],
            rival: {preload: true},
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

    shouldComponentUpdate(prevProps){/*update rival data when player is selected*/
        if(this.props.player.gamerTag !== prevProps.player.gamerTag){
            this.getRivalData(prevProps.player, false, true);
        }
        return true;
    }

    selectPlayer(rival){        
        this.props.history.push({pathname: '/players/' + encodeURIComponent(rival.gamerTag)});
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
        (newPlayer ? axios.get('http://' + process.env.DOMAIN + '/api/players/rivals/' + encodeURIComponent(player.gamerTag)) : Promise.resolve({data:{}}))
        .then(res => {            
            const rivals = res.data;
            if(newPlayer) this.setState({rivals: rivals});
            axios.all([
                axios.get('http://' + process.env.DOMAIN + '/api/players/matchHistory/' + encodeURIComponent(player.gamerTag) +'/' + encodeURIComponent(rival ? rival : rivals[0].gamerTag)),            
                axios.get('http://' + process.env.DOMAIN + '/api/players/player/' + encodeURIComponent(rival ? rival : rivals[0].gamerTag)),
                axios.get('http://' + process.env.DOMAIN + '/api/players/records/' + encodeURIComponent(player.gamerTag) +'/' + encodeURIComponent(rival ? rival : rivals[0].gamerTag)),                
                axios.get('http://' + process.env.DOMAIN + '/api/players/highestSet/' + encodeURIComponent(player.gamerTag) +'/' + encodeURIComponent(rival ? rival : rivals[0].gamerTag)),
                axios.get('http://' + process.env.DOMAIN + '/api/players/lastMet/' + encodeURIComponent(player.gamerTag) +'/' + encodeURIComponent(rival ? rival : rivals[0].gamerTag))
            ]).then(axios.spread((matchHistory, rival, records, highestSet, lastMet) => {                           
                import(/* webpackMode: "eager" */ `../../../public/rival_portraits/${rival.data.mains ? rival.data.mains.split(',')[0] : 'default'}.png`).then(rivalImg => {
                    this.setState({rivalPortrait: rivalImg.default});
                });
                this.setState({
                    matchHistory: matchHistory.data,
                    rival:  
                        {
                            gamerTag: rival ? rival.data.gamerTag : rivals[0].gamerTag,
                            setWins: records.data.player1SetWins,
                            setLosses: records.data.player2SetWins,
                            gameWins: records.data.player1GameWins,
                            gameLosses:records.data.player2GameWins,
                            highestTournament: highestSet.data.tournament.shortName,
                            highestPlacement: highestSet.data.placement,
                            lastMet: lastMet.data[0].shortName,
                            mains: rival.data.mains
                        }                                        
                });
            }));      
        });
        if(newPlayer){
            import(/* webpackMode: "eager" */ `../../../public/rival_portraits/${player.mains ? player.mains.split(',')[0] : 'default'}.png`).then(playerImg => {
                this.setState({playerPortrait: playerImg.default});
            });
        }        
    }
    //functions for randomizing badge features when player doesn't have badge data available
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
                    <RivalClearX onClick = {() => this.clearRivalSearch()} visible = {this.state.rivalQuery}/>
                    <div>  
                        {
                            this.state.rivals
                            .filter(r => this.state.rivalQuery === '' || r.gamerTag.toLowerCase().startsWith(this.state.rivalQuery.toLowerCase()))                                                 
                            .sort(this.state.rivalQuery ? ((r1, r2) => r1.gamerTag.toLowerCase() > r2.gamerTag.toLowerCase() ? 1 : -1) : () => 0) //alphabetical when typing
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
                                    <ImageWrapper  player = {true} preLoad = {this.state.rival.preload}>
                                        <img src={this.state.playerPortrait}/>
                                    </ImageWrapper>                                                                            
                                </Portrait>
                                <Portrait onClick = {() => this.selectPlayer(this.state.rival)}>                                    
                                    <PortraitSpacer/>
                                    <PortraitHeader>
                                        <span>P2</span>
                                        <span>{this.state.rival.gamerTag}</span>
                                    </PortraitHeader>
                                    <ImageWrapper preLoad = {this.state.rival.preload}>
                                        <img src={this.state.rivalPortrait}/>
                                    </ImageWrapper>                                                                            
                                </Portrait>
                            </Portraits>
                            <RivalStats>
                                <StatsListing>
                                    <div>
                                        <StatHeader width = {'100px'} marginLeft = {'68px'}>Set Record:</StatHeader>
                                        {!this.state.rival.preload ? <span>{this.state.rival.setWins + ' - ' + this.state.rival.setLosses}</span> : <span>-----</span>}
                                    </div>
                                    <div>
                                        <StatHeader width = {'120px'} marginLeft = {'48px'}>Game Record:</StatHeader>
                                        {!this.state.rival.preload ? <span>{this.state.rival.gameWins + ' - ' + this.state.rival.gameLosses}</span> : <span>-----</span>}
                                    </div>
                                    <div>
                                        <StatHeader width = {'100px'} marginLeft = {'66px'}>Highest Set:</StatHeader>
                                        {!this.state.rival.preload ? <span>{this.state.rival.highestTournament + ' For ' + this.state.rival.highestPlacement }</span> : <span>-----</span>}
                                    </div>
                                    <div>
                                        <StatHeader width = {'80px'} marginLeft = {'86px'}>Last Met:</StatHeader>
                                        {!this.state.rival.preload ? <span>{this.state.rival.lastMet}</span> : <span>-----</span>}
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

export default withRouter(PlayerDetailsRivals);