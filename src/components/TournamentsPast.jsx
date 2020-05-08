import React, {Component} from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import Moment from 'moment';
Moment.locale('en');
import theme from '../styles/Theme';

import TournamentSearch from './TournamentsSearch.jsx';
import First from '../../public/assets/gold-medal.png';
import Second from '../../public/assets/silver-medal.png';
import Third from '../../public/assets/bronze-medal.png';
import PlayersIcon from '../../public/assets/players-icon.png';
import CalendarIcon from '../../public/assets/calendar-icon.png';
import LocationIcon from '../../public/assets/location-icon.png';
import Smashgg from '../../public/assets/smash.gg.png';
import SeasonIcon from '../../public/assets/season-icon.png';
import SearchIcon from './svgs/SearchIcon.jsx';
import XIcon from './svgs/XIcon.jsx';

const listingBackground = '#DBE6EC';
const seedPrimary ='#A2A4C7';
const seedSecondary = '#807387';

const TournamentsListing = styled.div`
    grid-column: 2 / 3; 
    position: relative;
    max-width: 680px;
    height: 788px;      
    margin-right: 16px;
    overflow: scroll;
    overflow-x: hidden;      
    background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ', ' + props.theme.stripeGrey + ' 2px, ' + props.theme.stripeBlack + ' 2px, ' + props.theme.stripeGrey + ' 4px'}); 

    &::-webkit-scrollbar-track
    {        
        border-radius: 10px;
        background-color: ${props => props.theme.stripeGrey};
    }

    &::-webkit-scrollbar
    {
        width: 12px;
        background-color: ${props => props.theme.stripeGrey};
    }

    &::-webkit-scrollbar-thumb
    {
        border-radius: 10px;        
        background-color: ${props => props.theme.scrollbarSecondary};
        border-left: 2px solid ${props => props.theme.stripeGrey};
        border-right: 2px solid ${props => props.theme.stripeGrey};
    } 

    scrollbar-width: thin;
    scrollbar-color: ${props => props.theme.scrollbarSecondary +', ' + props.theme.stripeGrey};

    @media screen and (max-width: 960px){
        padding-left: 12px;
        max-width: 420px;
        min-width: 320px;
    }

    @media screen and (max-width: 706px){
        margin: 0 auto;
        grid-column: 1 / -1;
    }

    @media screen and (max-width: 480px){ 
        padding-right: 12px;
        max-width: 320px;
        &::-webkit-scrollbar {
            width: 0px !important;  /* remove scrollbar space */
        }
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
`;

const Header = styled.div`
    h3{                                    
        display: flex;
        justify-content: center;
        align-items: center;                     
        position: relative;   
        margin: 0;
        text-align: center;
        color: ${props => props.theme.white};
        height: 36px;
        padding-top: 8px;             
    }

    @media screen and (max-width: 1300px){
        width: 100%;    
        position: absolute;
    }
`;

const TournamentListing = styled.div`
    display: grid;                                              
    grid-template-columns: 4fr 4fr 3fr;                       
    margin-bottom: 20px;
    margin-left: 12px;
    background-color: ${props => props.selected ? props.theme.white : listingBackground};
    cursor: pointer;    

    &>span{
        grid-column: 1 / -1;
        padding: 8px 4px;
        background-color: ${props => props.theme.black};
        color: ${props => props.theme.white};
        font-size: 15px;
        font-weight: 550;
        text-align: center;
    }

    &:hover{
        background-color: ${props => props.theme.white};
    }        

    &>img{            
        grid-column: 1 / 2;
        grid-row: 2;            
        padding-top: 8px;
        padding-left: 8px;
        padding-right: 16px;
        max-width: 192px; 
    }
    
    @media screen and (max-width: 960px){
        grid-template-columns: minmax(160px, 1fr) 1fr;
        margin-left: 0;
        margin-right: 0;
        
        &>img{
            padding: 4px;
        }
    }

    @media screen and (max-width: 480px){
        max-width: 320px; 

        &>img{
            width: 160px;
        }        
    }

`;

const Placements = styled.div`
    grid-column: 1 / 2;
    grid-row: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4px;            

    &>div{
        display: flex;                     
        align-items: center;   
        margin-bottom: 4px;             
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;         
        //max-width: TBD;

        img{
            width: 20px;
            height: 20px;                    
        }

        span{                    
            font-size: 14px;
            font-weight: 550;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }    

    @media screen and (max-width: 960px){
        grid-row: 2;
        grid-column: 2 / 3;                
    }                              
    
    @media screen and (max-width: 480px){
        &>div {            
            max-width: 128px;      
        }
    }
`;

const Info = styled.div`    
    grid-row: 2 / 4;
    margin: auto 0;  
    font-size: 14px;          

    &>div{
        display: flex;
        font-weight: 550;
        align-items: center;

        img{
            width: 20px;
            height: 20px;
            margin-right: 8px;
        }        

        &:not(:first-child){
            margin-top: 12px;
        }
    }

    @media screen and (max-width: 960px){
        grid-row: 3;
        &>div{
            padding-left: 8px;

            &:not(:first-child){
                margin-top: 8px;
            }
        }
    }
`;

const Link =  styled.a`
    color: ${props => props.theme.link};
    text-decoration: none;
`;

const Seeds = styled.div`
    grid-row: 2 / 4;
    margin: auto 0;
    padding-left: 20px;               

    h4{                
        margin-top: 8px;
        padding-left: 12px;
        font-weight: 550;
        margin-bottom: 8px;
    }
    
    &>div{                
        font-size: 14px;
        font-weight: 550;
        margin-left: 8px;            
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        //max-width: TBD;

        &:not(:first-of-type){
            margin-top: 8px;
        }

        span:first-child{
            margin-right: 4px;
            font-weight: 550;
            color: transparent;
            background: -webkit-linear-gradient(${seedPrimary + ', ' + seedSecondary});
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }        
    }

    @media screen and (max-width: 960px){
        grid-row: 3;
        grid-column: 2 / 3;
        padding-left: 0;

        h4{
            margin-top: 0;
        }        
    }     

    @media screen and (max-width: 480px){
        &>div {            
            max-width: 128px;      
        }
    }
`;

const SearchWrapper = styled.div`
    display: none;
    position: sticky;
    top: 20px;  

    &>div{                
        position: relative;                
        width: 100%;
        height: 32px;
        margin-left: auto;

        &>div{
            display: block;
            right: 60px;
            top: 20px;
            left: unset;
            height: min-content;//crossbrowser logic safe
        }
    }

    &>button, &>div>button{
        display: block; 
        position: relative;                               
        margin-left: auto;
        margin-right: 8px;                     
        width: 32px;
        height: 32px;                
        background-color: ${props => props.theme.lightGrey};
        border-radius: 50%;
        border: solid 1px ${props => props.theme.grey};
        cursor: pointer;
        z-index: 50;
        outline: none;
        ${props => props.searching ? 
            (props) => (`
                span{
                height: 1px;
                width: 20px;
                background-color: ${props.theme.darkGrey};
                display: inline-block;
                position: absolute;
                left: 5px;
                top: 14.5px;

                &:first-child{
                    transform: rotate(45deg);
                }

                &:last-child{
                    transform: rotate(-45deg);
                }
            }`)
            : 
            null
        }                            
    }

    @media screen and (max-width: 1300px){
        display: block;
    }

    @media screen and (max-width: 480px){
        &>div>div{
            right: 20px;
        }
    }
`;

const listingsPerPage = 10;
class TournamentsPast extends Component{
    constructor(props){
        super(props);        
        this.state = {
            tournaments: [],
            banners: [],
            searching: false
        };
        this.lazyLoad = this.lazyLoad.bind(this);
        this.getTournaments = this.getTournaments.bind(this);
        this.selectTournament = this.selectTournament.bind(this);
    }

    componentDidMount(){
        this.getTournaments(this.props.query);
    };

    componentDidUpdate(prevProps){
        if(this.props.query !== prevProps.query){            
            this.getTournaments(this.props.query);
        }
    };

    lazyLoad(e) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
        if (bottom) {
            let queryString = this.props.query + '&lastTournament=' + this.state.tournaments.slice(-1)[0]._id;         
            this.getTournaments(queryString, true);
        }
    };

    getTournaments(query, lazy){
        axios.get('http://localhost:9001/api/tournaments/events/?count='+ listingsPerPage + query)
        .then(listing => {            
            let imports = listing.data.tournaments.map(t => import(/* webpackMode: "eager" */ `../../public/tournament_banners/${t.shortName.split(' ')[0]}96px.png`));            
            Promise.all(imports).then(images => this.setState(prevState => ({tournaments: (lazy ? prevState.tournaments : []).concat(listing.data.tournaments.map((t,i) => Object.assign({}, t, {banner: images[i].default})))})));
        });
    };    

    selectTournament(tournament){        
        this.props.history.push({pathname: '/tournaments/' + tournament.shortName.replace(' ', '-')});
        this.props.setTournament(tournament)
    }    

    render(){
        return (
            <TournamentsListing onScroll={this.lazyLoad}>
                <Header><h3>Past Tournaments</h3></Header>
                <SearchWrapper searching={this.state.searching}>
                {this.state.searching ?
                <div>
                    <TournamentSearch setQuery = {this.props.setQuery}/>
                    <button onClick = {() => this.setState({searching: false})}>
                        <XIcon fill={theme.darkGrey}/>                        
                    </button>                    
                </div> :
                <button onClick = {() => this.setState({searching: true})}>
                    <span><SearchIcon fill={theme.black}/></span>
                </button>}
                </SearchWrapper>
                {this.state.tournaments.map((t, i) => {
                    return <TournamentListing key={t.name} onClick = {() => this.selectTournament(t)} selected = {this.props.tournament.shortName === t.shortName}>
                        <span>{t.name}</span>
                        <img src = {t.banner}/>
                        <Placements>
                            <div>
                                <img src={First} />
                                <span>{t.topPlacements[0].gamerTag}</span>
                            </div>
                            <div>
                                <img src={Second} />
                                <span>{t.topPlacements[1].gamerTag}</span>
                            </div>
                            <div>
                                <img src={Third} />
                                <span>{t.topPlacements[2].gamerTag}</span>
                            </div>
                        </Placements>
                        <Info>
                            <div>
                                <img src={PlayersIcon} />
                                <span>{t.entrantCount}</span>
                            </div>
                            <div>
                                <img src={CalendarIcon} />
                                <span>{Moment(new Date(t.eventDate)).format('MMM D, YYYY')}</span>
                            </div>
                            <div>
                                <img src={LocationIcon} />
                                <span>{t.venue}</span>
                            </div>
                            <div>
                                {/*condition once Challonge tournaments are being added*/ }
                                <img src={Smashgg} />
                                <Link onClick = {(e) => e.stopPropagation()} href={t.bracketLink}>smash.gg</Link>
                            </div>
                            <div>
                                <img src={SeasonIcon} />
                                <span>Spring 2018</span>
                            </div>
                        </Info>
                        <Seeds>
                            <h4>Seeds</h4>
                            <div><span>1</span><span>{t.topSeeds[0].gamerTag}</span></div>
                            <div><span>2</span><span>{t.topSeeds[1].gamerTag}</span></div>
                            <div><span>3</span><span>{t.topSeeds[2].gamerTag}</span></div>
                            <div><span>4</span><span>{t.topSeeds[3].gamerTag}</span></div>
                            <div><span>5</span><span>{t.topSeeds[4].gamerTag}</span></div>
                        </Seeds>
                    </TournamentListing>}
                )}
            </TournamentsListing>
        );
    };
};

export default withRouter(TournamentsPast);