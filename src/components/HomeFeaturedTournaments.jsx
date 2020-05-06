import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Moment from 'moment';
Moment.locale('en');
import NavTriangle from './NavTriangle.jsx';
import OptionSwitch from './OptionSwitch.jsx';

const headerPrimary = '#B80612';
const headerSecondary = '#D82835';
const background = '#FFC7C8';
const tournamentsPerPage = 2;

const FeaturedTournaments = styled.div`  
    display: flex;
    flex-direction: column;
    justify-self: center;
    margin-bottom: 20px;
    max-width: 424px;
    margin: 0 auto;
    
    h2 {                 
        position: relative;
        background-color: ${headerPrimary};
        clip-path: polygon(0% 0%, 3% 100%, 97% 100%, 100% 0%);
        color: ${props => props.theme.white};      
        text-align: center;
        margin-bottom: 8px;
        width: 424px;

        &:before{
            display: block;
            position: absolute;
            content:'';
            background-color: ${headerSecondary};
            width: 24px;
            height: 100%;
            left: 2px;
            transform: skew(30deg);
        }

        &:after{
            display: block;
            position: absolute;
            content:'';
            background-color: ${headerSecondary};
            width: 24px;
            height: 100%;
            top: 0;
            right: 2px;
            transform: skew(-30deg);
        }
    }

    &>div{
        display: grid;
        justify-items: center;
        position: relative;                   
        grid-template-columns: 1fr;              
        padding: 8px 12px;          
        font-weight: 550;                
        align-self: center;
        border: solid 2px ${headerSecondary};
        background-color: ${background};                                                              
    }

    a{
        text-decoration: none;        
    }

    @media screen and (max-width: 480px) {
        width: 320px;
        margin-left: auto;
        margin-right: auto;
        
        h2{
            width: 320px;            
        }

        &>div{
            width: 300px;
            padding: 4px;
        }
    } 
`;

const TournamentListing = styled.div`
    display: flex;          
    margin-bottom: 16px;    

    img{
        width: 160px;
        height: 80px;
    }

    &>div{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        color: ${(props) => props.theme.black};                
        
        &>div{     
            display: flex;
            flex-direction: column;                         
            align-items: center;   
            justify-items: flex-end;    
            font-size: 16px;                                       
            margin-left: 8px;  
            width: 200px;                    

            & > div {//hmmmm?
                display: flex;
                height: 33%;
            }                    
        }
    } 

    @media screen and (max-width: 480px) {        
        img{
            width: 128px;
            height: 64px;
        }

        &>div>div{
            font-size: 14px;
            margin-left: 4px;
            width: 160px;
        }        
    }
`;

const Controls = styled.div`
    display: flex;
    width: -webkit-fill-available;
    margin-bottom: 0;

    &>div{
        flex-direction: row;                    
    }

    &>button{
        position: relative;
        top: 5px;

        &:first-child{
            left: -4px;            
        }
    }

    @media screen and (max-width: 480px) {
        &>div{
            width: 100%;
            button{
                font-size: 18px;
            }            
        }
    }

`;

const Spacer = styled.div`//liked this better than setting a min-height on the whole component 
    min-height: 80px;
    margin-bottom: 16px;
    @media screen and (max-width: 480px) {
        min-height: 64px;
    }
`;

class HomeFeaturedTournaments extends Component{
    constructor(props){
        super(props);
        this.state = {
            tournaments: {recent: [], upcoming: []},
            upcoming: true,//mode            
            pageStart: 0,
            pageEnd: 1 
        };        
        this.pageLeft = this.pageLeft.bind(this);
        this.pageRight = this.pageRight.bind(this);        
    }

    componentDidMount(){                
        const start = new Date().getTime() - (1000 * 60 * 60 * 24 * 100);
        const end = new Date().getTime() + (1000 * 60 * 60 * 24 * 60);//last number is # of days
        axios.get('http://localhost:9001/api/tournaments/listings?startDate='+ start + '&endDate='+ end)
        .then(tournaments => {
            let imports = tournaments.data.map(t => import(/* webpackMode: "eager" */ `../../public/tournament_banners/${t.shortName.split(' ')[0]}96px.png`));
            Promise.all(imports).then(images => {                                               
                let allTournaments = tournaments.data.map((t, i) => Object.assign({}, t, {banner: images[i].default}))
                .reduce((acc, cur) => {
                    if(new Date(cur.eventDate < new Date()) && !cur.featured){
                        acc.recent.push(cur)
                    }
                    else if(new Date(cur.eventDate >= new Date())){
                        acc.upcoming.push(cur)
                    }
                    return acc;
                }, {recent:[],upcoming: []});
                this.setState({tournaments: allTournaments});
            });
        });             
    }    

    pageLeft(){
        this.setState(prevState => {
            return {
                pageStart:  Math.max(0, prevState.pageStart - tournamentsPerPage),
                pageEnd:  Math.max(tournamentsPerPage - 1, prevState.pageEnd - tournamentsPerPage)
            }
        });
    }

    pageRight(){
        this.setState(prevState => {
            return {
                pageStart:  prevState.pageStart + tournamentsPerPage,
                pageEnd:  Math.min((this.state.upcoming ? this.state.tournaments.upcoming : this.state.tournaments.recent).length - 1, prevState.pageEnd + tournamentsPerPage)
            }
        });
    }

    toggleMode(){
        this.setState(prevState => {
            return {
                upcoming: !prevState.upcoming,
                pageStart: 0,
                pageEnd: 1
            }
        });
    }

    render(){        
        return(
            <FeaturedTournaments>
                <h2>Tournaments</h2>
                    <div>                                            
                        {
                            (this.state.upcoming ? this.state.tournaments.upcoming : this.state.tournaments.recent)
                            .filter((t, i) => i >= this.state.pageStart && i <= this.state.pageEnd)
                            .map((t,i) => {
                                return this.state.upcoming ?
                                <TournamentListing key = {t.name}>
                                        <img src = {t.banner}/>
                                        <div>
                                            <div><span><span>{t.shortName}</span></span></div>
                                            <div><span><span>{Moment(new Date(t.eventDate)).format('MMM D, YYYY')}</span></span></div>
                                            <div><span><span>{t.venue}</span></span></div>
                                        </div>
                                </TournamentListing>
                                :
                                <Link to={`/tournaments/${t.shortName.replace(' ', '-')}`} key = {t.name}>
                                    <TournamentListing>
                                        <img src = {t.banner}/>
                                        <div>
                                            <div><span><span>{t.shortName}</span></span></div>
                                            <div><span><span>{Moment(new Date(t.eventDate)).format('MMM D, YYYY')}</span></span></div>
                                            <div><span><span>{t.venue}</span></span></div>
                                        </div>
                                    </TournamentListing>
                                </Link>                                
                            })
                        }
                        {(this.state.upcoming ? this.state.tournaments.upcoming : this.state.tournaments.recent).length - 1 === this.state.pageStart ? <Spacer/> : null}
                        <Controls>                            
                            <NavTriangle left={true} onClick = {this.pageLeft} disabled = {!this.state.pageStart}/>
                                <OptionSwitch selected = {this.state.upcoming} left = 'Upcoming' right = 'Recent' onToggle = {() => this.toggleMode()} background={background}/>
                            <NavTriangle left={false} onClick = {this.pageRight} disabled = {this.state.pageEnd >= (this.state.upcoming ? this.state.tournaments.upcoming : this.state.tournaments.recent).length-1}/>
                        </Controls>
                    </div> 
            </FeaturedTournaments>
        )
    }
};

export default HomeFeaturedTournaments;