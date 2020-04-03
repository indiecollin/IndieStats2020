import React, {Component} from 'react';
import styled from 'styled-components';
import Moment from 'moment';
Moment.locale('en');

import First from '../../public/images/gold-medal.png';
import Second from '../../public/images/silver-medal.png';
import Third from '../../public/images/bronze-medal.png';
import PlayersIcon from '../../public/images/players-icon.png';
import CalendarIcon from '../../public/images/calendar-icon.png';
import LocationIcon from '../../public/images/location-icon.png';
import Smashgg from '../../public/images/smash.gg.png';
import SeasonIcon from '../../public/images/season-icon.png';

const link = '#5858A5';
const listingSelected = '#FF8C8C';
const seedPrimary ='#A2A4C7';
const seedSecondary = '#807387';

const TournamentsListing = styled.div`
    grid-column: 2 / 3; 
    position: relative;   
    width: 600px;
    height: 788px;      
    overflow: scroll;
    overflow-x: hidden;      
    background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ' 0 2px, ' + props.theme.stripeBlack + ' 2px 4px'});     

    /* .menu-button{
        display: none;
    } */    

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

    //insert media queries here
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
`;

const TournamentListing = styled.div`
    display: grid;                                              
    grid-template-columns: 4fr 4fr 3fr;                              
    margin-bottom: 20px;
    margin-left: 12px;
    background-color: ${props => props.selected ? listingSelected : props.theme.white};
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
        background-color: ${() => listingSelected};
    }        

    &>img{              
        grid-column: 1 / 2;
        grid-row: 2;            
        padding-top: 8px;
        padding-right: 16px;  
        max-width: 192px; 
    }                 
`;

const Placements = styled.div`
    grid-column: 1 / 2;
    grid-row: 3;
    display: flex;
    flex-direction: column;
    padding: 4px;            

    &>div{
        display: flex;                     
        align-items: center;   
        margin-bottom: 4px;                      

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
`;

const Link =  styled.span`
    color: ${() => link};
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

        &:not(:first-of-type){
            margin-top: 8px;
        }

        span:first-child{
            margin-right: 4px;
            font-weight: 550;
            color: transparent;
            background: -webkit-linear-gradient(${() => seedPrimary + ', ' + seedSecondary});
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }            
`;

class TournamentsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            banners: []
        }
    }

    componentDidMount(){            
        let imports = this.props.tournaments.map(t => import(/* webpackMode: "eager" */ `../../public/tournament_banners/${t.banner}`));
        Promise.all(imports).then(images => this.setState({banners: images.map(banner => banner.default)}));      
    }

    render(){
        return (
            <TournamentsListing>
                <Header><h3>Past Tournaments</h3></Header>
                {this.props.tournaments.map((t, i) => {
                    return <TournamentListing>
                        <span>{t.name}</span>
                        <img src = {this.state.banners[i]}/>
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
                                <Link>smash.gg</Link>
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

export default TournamentsList;

    /* @media screen and (max-width: 1300px){

        .tournament-list-header{
            width: 100%;    
            position: absolute;
        }

        .search-wrapper{
            position: sticky;
            top: 20px;            

            .search-menu{                
                position: relative;                
                width: 100%;
                height: 32px;
                margin-left: auto;

                .search-tournaments{
                    display: block;
                    right: 60px;
                    top: 20px;
                    left: unset;
                    height: min-content;
                }
            }
            .menu-button{
                display: block; 
                position: relative;                               
                margin-left: auto;
                margin-right: 8px;                     
                width: 32px;
                height: 32px;                
                border-radius: 50%;
                border: solid 1px ${props => props.theme.grey};
                cursor: pointer;
                z-index: 50;
                outline: none;

                .info-icon, .search-icon{
                    margin-right: 20px;                                                
                    svg{                
                        fill: black;                
                        width: 16px;
                        height: 16px;                                
                    }            
                }        
                    
                .search-icon svg{
                    margin-left: 7px;
                    margin-top: 4px;
                }

                &.open{

                    span{
                        height: 1px;
                        width: 20px;
                        background-color: ${props => props.theme.darkGrey};
                        display: inline-block;
                        position: absolute;
                        left: 5px;
                        top: 14.5px;
                    }
                    
                    .x-left{
                        transform: rotate(45deg);
                    }
            
                    .x-right{
                        transform: rotate(-45deg);
                    }
                }            
            }
        }
    }    

    @media screen and (max-width: 960px){

        padding-left: 12px;        
        max-width: 420px;
        min-width: 320px;        

        .tournament-listing{
            grid-template-columns: minmax(160px, 1fr) 1fr;
            margin: 0;
            
            .banner{
                padding: 4px;
            }

            .placements{
                grid-row: 2;
                grid-column: 2 / 3;
            }

            .info{
                grid-row: 3;

                .data-wrapper{
                    padding-left: 8px;

                    &:not(:first-child){
                        margin-top: 8px;
                    }
                }
            }

            .seeds{
                grid-row: 3;
                grid-column: 2 / 3;
                padding-left: 4px;

                h4{
                    margin-top: 0;
                }
            }
        }
    }

    @media screen and (max-width: 706px){
        margin: 0 auto;
    }

    @media screen and (max-width: 480px){        
        padding-right: 12px;
        &::-webkit-scrollbar {
            width: 0px !important;
        }

        .tournament-listing{
            max-width: 320px; 

            .banner{
                width: 160px;
            }
        }
        .search-wrapper .search-menu .search-tournaments{
            right: 32px;
            .search-hub .search-by-player .tooltip-wrapper .tooltip-text{
                width: 108px;
                padding: 8px 4px;
            }
            .react-date-picker__calendar--open{
                max-width: 320px;
                left: -32px !important;//sue me!
            }
        }
    } */