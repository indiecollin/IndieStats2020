import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Moment from 'moment';
Moment.locale('en');
import Expander from './Expander.jsx';
import CalendarIcon from '../../public/assets/calendar-icon.png';
import LocationIcon from '../../public/assets/location-icon.png';
import Smashgg from '../../public/assets/smash.gg.png';
import SeasonIcon from '../../public/assets/season-icon.png';

const UpcomingTournamentsContainer = styled.div`
    width: 280px;
    margin: 0 auto;
    padding-bottom: 20px;        
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UpcomingTournaments = styled.div`
    max-height: 790px;//may update when carousel added
    margin: 0 auto;
    padding: 0 16px;
    overflow: hidden;       
    background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ', ' + props.theme.stripeGrey + ' 2px, ' + props.theme.stripeBlack + ' 2px, ' + props.theme.stripeGrey + ' 4px'}); 

    h3{
        text-align: center;
        color: #fff;
        height: 36px;
        margin: 0;
        padding-top: 8px;
    }
`;

const UpcomingListingsWrapper = styled.div`
    height: 752px;
    max-height: ${props => props.expanded ? '752px' : '0' };//temp    
    overflow: scroll;
    transition: max-height .5s linear;        

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        width: 0px;  /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */        
    }    
    
`;

const UpcomingListing = styled.div`
    height: 240px;//temp
    margin-top: 20px;                       
    overflow: hidden;    
    user-select: none;    
    display: grid;
    grid-template-columns: 48px 1fr;                        
    background-color: ${props => props.theme.tourneyColor};

    @media screen and (max-width: 706px){
        grid-column: 1 / -1;                
    }
`;

const TournamentBanner = styled.img`
    grid-area: 1 / 1 / 2 / 3;                
    justify-self: center;
`;

const TournamentName = styled.span`
    grid-area: 2 / 1 / 3 / 3;
    align-self: center;
    text-align: center;                
    width: 100%;                
    padding: 8px 4px;
    background-color: ${props => props.theme.black};
    color: ${props => props.theme.white};
    font-size: 15px;//consider changing
    font-weight: 550;    
`;

const DataGrid = styled.div`
    grid-area: 3 / 1 / 7 / 3;
    background-color: ${props => props.theme.white};     
    z-index: 10;
`;

const DataIcon = styled.img`
    grid-column: 1 / 2;     
    grid-row: ${props => props.gridRow};
    align-self: center;      
    z-index: 10;                                      
    width: 16px;
    height: 16px;
    margin: 0 8px 0 24px;
`;

const DataInfo = styled.span`
    grid-column: 2 / 3;      
    grid-row: ${props => props.gridRow};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;  
    align-self: center;                               
    z-index: 20;
    font-weight: 550;      
    font-size: 14px;    
`;

const TournamentLink = styled(DataInfo)`
    color: ${props => props.theme.link};
`;

class TournamentsUpcoming extends Component{
    constructor(props){
        super(props);
        this.listingRef = React.createRef();
        this.state = {
            banners: [],
            expanded: true,
            cycle: false,
            listingHovered: false,
            listingClickY: null,
            listingScrollUp: null,
            tournaments: []
        };
    }

    componentDidMount(){
        const today = new Date().getTime();
        const range = today + 1000 * 60 * 60 * 24 * 60;//last number is # of days
        axios.get('http://localhost/api/tournaments/listings?startDate='+ today + '&endDate='+ range)
        .then(tournaments => {
            let imports = tournaments.data.map(t => import(/* webpackMode: "eager" */ `../../public/tournament_banners/${t.shortName.split(' ')[0]}96px.png`));
            Promise.all(imports).then(images => this.setState({tournaments: tournaments.data.map((t, i) =>  Object.assign({}, t, {banner: images[i].default}))}));
            if(window.innerWidth > 706 && tournaments.data.length>3){
                this.interval = setInterval(()=>{        
                    let first = this.listingRef.current.children[0]
                    if(!this.state.listingHovered){
                        this.listingRef.current.scrollTop++
                    }            
                    if(first && first.getBoundingClientRect().bottom <= this.listingRef.current.getBoundingClientRect().top){
                        this.setState((prevState) => {
                            return{
                                cycle: true,
                                scrollY: window.scrollY,
                                tournaments: prevState.tournaments.concat(prevState.tournaments.splice(0,1)),
                                banners: prevState.banners.concat(prevState.banners.splice(0,1))
                            }
                        });                    
                        this.listingRef.current.scrollTop = 0;
                    }
                }, 10); 
            }  
        });                   

        this.listingRef.current.addEventListener('scroll', () =>{             
            if(this.state.cycle){      
                window.scrollTo(window.scrollX, this.state.scrollY);
                this.setState({cycle: false})
            }          
        })

        this.listingRef.current.addEventListener('mouseover', ()=>{
            this.setState({listingHovered: true})
        })

        this.listingRef.current.addEventListener('mouseleave' , ()=>{
            this.setState({
                listingHovered: false            
            })
        })       
    }
        
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        return (
            <UpcomingTournamentsContainer>
                <UpcomingTournaments>
                    <h3>Upcoming Tournaments</h3>
                    <UpcomingListingsWrapper expanded = {this.state.expanded} ref = {this.listingRef}>                        
                        {
                            this.state.tournaments.map((t, i) => {
                                return <UpcomingListing key = {t.name}>
                                    <TournamentBanner src={t.banner} />
                                    <TournamentName>{t.name}</TournamentName>
                                    <DataGrid></DataGrid>
                                    <DataIcon src={CalendarIcon} gridRow = '3/4'/><DataInfo gridRow = '3/4'>{Moment(new Date(t.eventDate)).format('MMM D, YYYY')}</DataInfo>
                                    <DataIcon src={LocationIcon} gridRow = '4/5'/><DataInfo gridRow = '4/5'>{t.venue}</DataInfo>
                                    <DataIcon src={Smashgg} gridRow = '5/6'/><TournamentLink gridRow = '5/6'>smash.gg</TournamentLink>
                                    <DataIcon src={SeasonIcon} gridRow = '6/7'/><DataInfo gridRow = '6/7'>Spring 2020</DataInfo>
                                </UpcomingListing>
                            })
                        }                
                    </UpcomingListingsWrapper>
                </UpcomingTournaments>
                <Expander expanded={this.state.expanded} onClick = {() => this.setState({expanded: !this.state.expanded})}/>
            </UpcomingTournamentsContainer>
        );
    };
};

export default TournamentsUpcoming;