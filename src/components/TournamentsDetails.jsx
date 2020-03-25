import React from 'react';
import styled from 'styled-components';
import Moment from 'moment';
Moment.locale('en');
import theme from '../styles/Theme';
import ClearX from './ClearX.jsx';
import SortArrows from './SortArrows.jsx';
import MSM from '../../public/images/MSM96px.png';
import Smashgg from '../../public/images/smash.gg.png';
import Facebook from '../../public/images/facebook.png';

const header = '#B7C5CE';
const tableRow = '#D9DFFF';
const win = '#90EE90';
const loss = '#F08080';

const overflowEllipsis = `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const playerSearchPos = {
    top: '12.5px',
    left: '232px'
};

const playerSorterPos = {right: '98px'}
const placeSorterPos = {right: '4px'}
const seedSorterPos = {right: '8px'}

const TournamentHub = styled.div`
    width: 932px;
    min-height: 500px;
    margin: 20px auto 40px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    position: relative;                            
    background-color: ${props => props.theme.lightGrey};
    overflow: hidden;
`;

const Header = styled.div`
    background-color: ${() => header};
    z-index: 50;    
    
    &>div{
        height: 100%;
        padding-top: 40px;
        margin: 0 auto;
        grid-column: 2 / 3;
        grid-row: 1;
        display: flex;
        flex-direction: column;

        h2{
            font-size: 26px;
            margin: 0 auto;
            margin-left: calc((932px - 60px - 100%) * .5 );
        }

        div{
            padding: 8px 0;
            display: flex;
            justify-content: space-between;
            min-width: 320px;
            margin-left: calc((932px - 60px - 100%) * .25 );
            margin-right: calc((932px - 60px - 100%) * .5 );               

            p{
                font-size: 16px;          
                font-weight: 550;          
            }

            a img{
                width: 24px;
            }                
        }   
    }
`;

const Banner = styled.div`
    background-color: ${() => header};
    z-index: 50;
    grid-column: 1 / 2;
    grid-row: 1;
    padding-top: 20px;
    display: flex;
    
    img{
        margin: 0 auto;
        max-width: 192px;
    }
`;

const Search = styled.div`
    position: relative;
    background-color: ${() => header};
    z-index: 50;    
    grid-column: 1 / -1;
    grid-row: 2;
    padding: 8px 0 8px 62px;

    input{
        width: 192px;
        position: relative;
    }        

    button{
        z-index: 100;
        left: ${() => playerSearchPos.left};
    }
`;

const TableWrapper = styled.div`
    padding: 0 20px;
    grid-column: 1 / -1;
    grid-row: 3;
    position: relative;

    table{
        min-height: 500px;
        table-layout: fixed;
        border-collapse: collapse;
        margin-bottom: auto;

        &>div{
            padding-right: 16px;
            height: 600px;
            overflow-y: scroll;
            &::-webkit-scrollbar-track
            {
                border-radius: 10px;
                border-radius: 10px;
                background-color: ${props => props.theme.scrollbarPrimary};
            }

            &::-webkit-scrollbar
            {
                width: 12px;
                border-radius: 10px;
                background-color: ${props => props.theme.scrollbarPrimary};
            }

            &::-webkit-scrollbar-thumb
            {
                border-radius: 10px;
                background-color: ${props => props.theme.scrollbarSecondary};
                border-left: 2px solid ${props => props.theme.scrollbarPrimary};
                border-right: 2px solid ${props => props.theme.scrollbarPrimary};
            }
        }

    }

    th{
        text-align: left;
        height: 32px;
    }

    tr{
    min-height: 28px;

        &:nth-child(2n) td{
            background-color: ${()=> tableRow};
        }
    }

    /* .last-row{//not sure what this is for
        height: 100%;
    } */

    th, td{
        //this might cover all overflow related things
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        min-height: 28px;
    }

    td{
        padding: 4px 8px;

        &.gamer-tag, &.loser.true, &.eliminator.true{
            cursor: pointer;   
        }
    }

    td:first-child {
        border-radius: 6px 0 0 6px;
    }

    td:nth-last-child(1){//update when adding responsiveness
        border-radius: 0 6px 6px 0;
    }        
`;

const columnStyles = (props => {    
     (`
        position: ${props => props.position === 'relative' ? 'relative' : 'unset'};
        width: ${props => props.width + 'px'};
        max-width: ${props => props.maxWidth ? props.maxWidth + 'px' : 'unset'};`
    );
});

const ColumnHeader = styled.th`
    /* ${props => columnStyles(props)} */
    position: ${props => props.position === 'relative' ? 'relative' : 'unset'};
    width: ${props => props.width + 'px'};
    max-width: ${props => props.maxWidth ? props.maxWidth + 'px' : 'unset'};
`;

const ColumnData = styled.td`
    /* ${props => columnStyles(props)} */
    position: ${props => props.position === 'relative' ? 'relative' : 'unset'};
    width: ${props => props.width + 'px'};
    max-width: ${props => props.maxWidth ? props.maxWidth + 'px' : 'unset'};
`;

const Matches = styled(ColumnData)`    
    height: 32px;
    padding: 0;
    display: flex;                
    align-items: center;                     
`;
//maybe just export match icon instead
const matchIconStyles = `
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.black};
    font-size: 12px;
    font-weight: 550;
    border-radius: 2.5px;
    width: 16px;
    height: 16px;
    margin-right: 2px;
    background-color: ${props => props.win ? win : loss};
`;

const MatchIcon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.black};
    font-size: 12px;
    font-weight: 550;
    border-radius: 2.5px;
    width: 16px;
    height: 16px;
    margin-right: 2px;
    background-color: ${props => props.win ? win : loss};    
`;

const LinkColumn = styled(ColumnData)`
    cursor: ${props => props.link ? 'pointer' : 'unset'};
    ${props => props.overflow ? overflowEllipsis : ''}

`;

const infoExpanderStyles = `
    width: 40px;
    display: none;            

    svg{
        width: 20px;
        height: 20px;
        fill: ${props => props.theme.scrollbarPrimary};
        stroke: ${props => props.theme.black};
        stroke-width: 8px;
        cursor: pointer;
        position: relative;
        margin: unset;
    }
`;

const InfoExpanderHeader = styled.th`    
    ${() => infoExpanderStyles}
`;

const InfoExpanderData = styled.td`    
    ${() => infoExpanderStyles}
`;

const TournamentsDetails = (props) => {
    return(
        <TournamentHub>
            <Header>
                <div>
                    <h2>{props.tournament.name}</h2>
                    <div>                
                        <p>{Moment(new Date(props.tournament.eventDate)).format('MMM D, YYYY')}</p>
                        <p>{props.tournament.entrantCount} Entrants</p>                    
                        <a href={props.tournament.bracketLink}><img src={Smashgg}></img></a>
                        <a href='#'><img src={Facebook}></img></a>   
                        {/* {props.tournament.eventPage ? <p>Event Page: {props.tournament.eventPage}</p> : null}                 */}
                    </div>                
                </div> 
            </Header>
            <Banner>
                <img src = {MSM}/>
            </Banner>
            <Search>
                <input type='text' placeholder='Search Player' />
                <ClearX visible = {true} position = {playerSearchPos}/>
            </Search>            
            <TableWrapper>
                <table>
                    <div>
                        <tbody>                    
                            <tr>
                                <ColumnHeader width='160' position='relative'>
                                    Player
                                    <SortArrows position = {playerSorterPos} baseColor = {theme.black} hoverColor = {theme.hoverRed}/>
                                </ColumnHeader>
                                <ColumnHeader width='60' position='relative'>
                                    Place
                                    <SortArrows position = {placeSorterPos} baseColor = {theme.black} hoverColor = {theme.hoverRed}/>
                                </ColumnHeader>
                                <ColumnHeader width='60' position='relative'>
                                    Seed
                                    <SortArrows position = {seedSorterPos} baseColor = {theme.black} hoverColor = {theme.hoverRed}/>
                                </ColumnHeader>
                                <ColumnHeader width='64'>Record</ColumnHeader>
                                <ColumnHeader width='200'>Matches</ColumnHeader>
                                <ColumnHeader width='160'>Loss To</ColumnHeader>
                                <ColumnHeader width='160'>Eliminator</ColumnHeader>
                                {/* <th className='info-expander'>More</th> */}
                            </tr>
                            {props.tournament.players
                            // .filter(p => !this.state.query || p.gamerTag.toLowerCase().startsWith(this.state.query.toLowerCase()))//query filtering                    
                            // .sort((p1, p2) => {
                            //     switch(this.state.sort){
                            //         case 'gamerTag': 
                            //             if(p1.gamerTag.toLowerCase() < p2.gamerTag.toLowerCase()) { return -1 * this.state.sortAsc }
                            //             if(p1.gamerTag.toLowerCase() > p2.gamerTag.toLowerCase()) { return 1 * this.state.sortAsc }
                            //             return 0                            
                            //         case 'placement': return (p1.placement - p2.placement) * this.state.sortAsc//use the ordinal!                           
                            //         case 'seed': return (p1.seed - p2.seed)  * this.state.sortAsc
                            //         default: return 1                            
                            //     }
                            // })
                            .map(p=>{
                                //let loserClasses = p.loser ? 'loser true' : 'loser'
                                //let eliminatorClasses = p.eliminator ? 'eliminator true' : 'eliminator'
                                return <tr key={p.gamerTag}>
                                    <LinkColumn width='160'>{p.gamerTag}</LinkColumn>
                                    <ColumnData width='60'>{p.placement}</ColumnData>
                                    <ColumnData width='60'>{p.seed}</ColumnData>
                                    <ColumnData width='64'>{p.wins+' - '+p.losses}</ColumnData>
                                    <Matches>                                        
                                        {p.matches.split('').map(m => <MatchIcon win = {m == 'W'}>{m}</MatchIcon>)}
                                    </Matches>
                                    <LinkColumn width='160' link = {p.loser}>{p.loser ? p.loser : '-----'}</LinkColumn>
                                    <LinkColumn width='160' link = {p.eliminator}>{p.eliminator ? p.eliminator : '-----'}</LinkColumn>                                    
                                    {/* <td className='info-expander' onClick={() => this.toggleMoreInfo(p)}><CaretIcon></CaretIcon></td> */}
                                </tr>
                            })}
                            {/* <tr className='last-row'></tr> what is this for? */}
                        </tbody>
                    </div>
                </table> 
            </TableWrapper>
        </TournamentHub>
    )
};

export default TournamentsDetails;