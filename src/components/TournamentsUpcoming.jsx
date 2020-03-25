import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Moment from 'moment';
Moment.locale('en');
import Expander from './Expander.jsx';
import CalendarIcon from '../../public/images/calendar-icon.png';
import LocationIcon from '../../public/images/location-icon.png';
import Smashgg from '../../public/images/smash.gg.png';
import SeasonIcon from '../../public/images/season-icon.png';

const bannerBackground = '#AC3C3C';
const link = '#5858A5';

const UpcomingTournamentsContainer = styled.div`
    width: 280px;
    margin: 0 auto;
    padding-bottom: 20px;
`;

const UpcomingTournaments = styled.div`    
    margin: 0 auto;
    padding: 0 16px;
    overflow: hidden;   
    background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ' 0 2px, ' + props.theme.stripeBlack + ' 2px 4px'});

    h3{
        text-align: center;
        color: #fff;
        height: 36px;
        margin: 0;
        padding-top: 8px;
    }

    /* &>span{
        text-align: center;
        color: ${props => props.theme.white};
        height: 36px;
        padding-top: 8px;
    } */
`;

const UpcomingListingsWrapper = styled.div`
    max-height: 752px;//temp
    min-height: 752px;
    overflow: scroll;
    transition: max-height .5s linear;
    padding-bottom: 240px;
    //cursor: pointer;

    &::-webkit-scrollbar {
        width: 0px;  /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */
    }

    /* @media screen and (max-width: 706px){
        padding-bottom: 0;
    } */          
`;

const UpcomingListing = styled.div`
    height: 240px;//temp
    margin-top: 20px;                       
    overflow: hidden;    
    user-select: none;    
    display: grid;
    grid-template-columns: 48px 1fr;                        
    background-color: ${() => bannerBackground};
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
    color: ${()=> link};
`;

const TournamentsUpcoming = (props) => {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        let imports = props.tournaments.map(t => import(/* webpackMode: "eager" */ `../../public/tournament_banners/${t.banner}`));
        Promise.all(imports).then(images => setBanners(images.map(banner => banner.default)));
      });
    return <UpcomingTournamentsContainer>
        <UpcomingTournaments>
            <h3>Upcoming Tournaments</h3>
            <UpcomingListingsWrapper>                        
                {
                    props.tournaments.map((t, i) => {
                        return <UpcomingListing key = {t.name}>
                            <TournamentBanner src={banners[i]} />
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
        <Expander/>
    </UpcomingTournamentsContainer>
}

export default TournamentsUpcoming;