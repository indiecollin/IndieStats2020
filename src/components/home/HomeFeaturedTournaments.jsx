import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Moment from 'moment';
Moment.locale('en');
import NavTriangle from '../NavTriangle.jsx';
import OptionSwitch from '../OptionSwitch.jsx';

const headerPrimary = '#B80612';
const headerSecondary = '#D82835';
const background = '#FFC7C8';
const tournamentsPerPage = 2;
const daysBackward = 10000;
const daysForward = 60;

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
        color: ${props => props.theme.white};      
        text-align: center;
        margin-bottom: 8px;
        width: 396px;

        &:before{
            display: block;
            position: absolute;
            content:'';
            background-color: ${headerSecondary};
            width: 24px;
            height: 100%;
            left: -8px;
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
            right: -8px;
            transform: skew(-30deg);
        }
    }

    &>div{
        display: flex;
        flex-direction: column;
        justify-items: center;
        position: relative;                           
        padding: 8px 12px;          
        font-weight: 550;                
        align-self: center;
        border: solid 2px ${headerSecondary};
        background-color: ${background};
        min-width: 396px;
        min-height: 244px;                                                    
    }

    a{
        text-decoration: none;  
        &:hover{
            outline: 2px solid ${props => props.theme.hoverRed};
        }              
    }

    @media screen and (max-width: 480px) {/*shrinks component*/
        width: 320px;
        margin-left: auto;
        margin-right: auto;
        
        h2{
            width: 288px;
            margin-left: auto;
            margin-right: auto;
        }

        &>div{
            width: 300px;
            padding: 4px;
            min-width: 300px;
            min-height: 188px;
        }
    } 
`;

const TournamentListing = styled.div`
    display: flex;          
    margin-top: 4px;        
    margin-bottom: 4px;        

    img{
        width: 160px;
        height: 80px;
    }

    &>div{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        color: ${(props) => props.theme.black};                
        
        &>span{     
            display: flex;
            flex-direction: column;                         
            align-items: center;   
            justify-items: flex-end;    
            font-size: 16px;                                       
            margin-left: 8px;  
            width: 200px;            
        }
    } 

    @media screen and (max-width: 480px) {/*shrinks image & details*/    
        img{
            width: 128px;
            height: 64px;
        }

        &>div>span{
            font-size: 14px;
            margin-left: 4px;
            width: 160px;
        }        
    }
`;

const Controls = styled.div`
    display: flex;
    width: 100%;    
    margin-top: auto;
    margin-bottom: 0;
    height: 32px;

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

    @media screen and (max-width: 480px) {/*reduces font and widens controls for less clutter*/
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
            upcoming: false,//mode            
            pageStart: 0,
            pageEnd: 1 
        };        
        this.pageLeft = this.pageLeft.bind(this);
        this.pageRight = this.pageRight.bind(this);        
    }

    componentDidMount(){                        
        const start = new Date().getTime() - (1000 * 60 * 60 * 24 * daysBackward);
        const end = new Date().getTime() + (1000 * 60 * 60 * 24 * daysForward);
        axios.get('http://' + process.env.DOMAIN + '/api/tournaments/listings?startDate='+ start + '&endDate='+ end)
        .then(tournaments => {//get all tournaments for listing
            let imports = tournaments.data.map(t => import(/* webpackMode: "eager" */ `../../../public/tournament_banners/${t.shortName.split(' ')[0]}96px.png`));
            Promise.all(imports).then(images => {                                               
                let allTournaments = tournaments.data.map((t, i) => Object.assign({}, t, {banner: images[i].default}))
                .reduce((acc, cur) => {//splits tournaments into two arrays as properties of an object
                    if(new Date(cur.eventDate) < new Date() && !cur.featured){
                        acc.recent.push(cur)
                    }
                    else if(new Date(cur.eventDate) >= new Date()){
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
        const pageEnd = prevState.pageEnd % 2 === 0 ? prevState.pageEnd + 1 : prevState.pageEnd
            return {
                pageStart:  Math.max(0, prevState.pageStart - tournamentsPerPage),
                pageEnd:  Math.max(tournamentsPerPage - 1, pageEnd - tournamentsPerPage)
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
                                <a href={t.bracketLink} key = {t.name} target="_blank">
                                <TournamentListing key = {t.name}>
                                        <img src = {t.banner}/>
                                        <div>
                                            <span>{t.shortName}</span>
                                            <span>{Moment(new Date(t.eventDate)).format('MMM D, YYYY')}</span>
                                            <span>{t.venue}</span>
                                        </div>
                                </TournamentListing>
                                </a>
                                :
                                <Link to={`/tournaments/${t.shortName.replace(' ', '-')}`} key = {t.name}>
                                    <TournamentListing>
                                        <img src = {t.banner}/>
                                        <div>
                                            <span>{t.shortName}</span>
                                            <span>{Moment(new Date(t.eventDate)).format('MMM D, YYYY')}</span>
                                            <span>{t.venue}</span>
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