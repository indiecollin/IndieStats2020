import React, {Component} from 'react';
import styled from 'styled-components';
import Moment from 'moment';
Moment.locale('en');
import theme from '../styles/Theme';
import MoreInfo from './TournamentResponsiveDetails.jsx';
import ClearX from './ClearX.jsx';
import CaretIcon from './svgs/CaretIcon.jsx'; 
import SortArrows from './SortArrows.jsx';
import Smashgg from '../../public/assets/smash.gg.png';
import Facebook from '../../public/assets/facebook.png';

const header = '#B7C5CE';
const tableRow = '#D9DFFF';
const win = '#90EE90';
const loss = '#F08080';
const expanderFill = '#BFBFBF';

const overflowEllipsis = `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const playerSearchPos = {
    top: '11.5px',
    left: '232px',
    tabletLeft: '140px',
    mobileLeft: '252px'
};

const playerSorterPos = {right: '98px'}
const placeSorterPos = {right: '4px'}
const seedSorterPos = {right: '8px'}

const TournamentHub = styled.div`
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 2fr;
    position: relative;
    min-height: 500px;
    margin: 20px auto 40px;
    overflow: hidden;
    background-color: ${props => props.theme.lightGrey};
`;

const Header = styled.div`
    background-color: ${header};
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

    @media screen and (max-width: 960px){
        margin: 0 auto;
        &>div {
            h2{
                margin: 0 auto;
                font-size: 22px;
            }
            div{
                margin: 0 auto;
                justify-content: space-around;
            }
        }        
    }

    @media screen and (max-width: 706px){
        margin: 0;

        &>div{
            padding: 36px 4px 0 4px;

            h2{font-size: 20px;}

            div{
                margin: 0;
                min-width: 240px;

                p{font-size: 14px;}
            } 
        }
    }

    @media screen and (max-width: 480px){
        grid-template-columns: 1fr;
        grid-column: 1 / -1;
        flex-direction: column;        
        max-width: 320px;

        &>div{
            grid-column: 1 / 3;
            grid-row: 2;
            padding: 0;            
            margin: 0 auto;
        }                
    }

`;

const Banner = styled.div`
    background-color: ${header};
    z-index: 50;
    grid-column: 1 / 2;
    grid-row: 1;
    padding-top: 20px;
    display: flex;
    
    img{
        margin: 0 auto;
        max-width: 192px;
    }

    @media screen and (max-width: 960px){
        img{ 
            margin: 0 auto;
            max-width: 160px;
        }
    }

    @media screen and (max-width: 480px){
        grid-column: 1 / -1;
        padding: 8px 25%;
        img{
            width: 100%;
            margin:0 auto;
        }        
    }
`;

const Search = styled.div`
    position: relative;
    background-color: ${header};
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
        left: ${playerSearchPos.left};
    }

    @media screen and (max-width: 960px){        
        padding-left: 0;
        input{
            width: 160px;
        }
        button{
            left: ${playerSearchPos.tabletLeft};
        }
    }

    @media screen and (max-width: 480px){    
        padding: 8px 15%;
        grid-row: 3;

        input{
            width: 100%;
        }
        button{
            left: ${playerSearchPos.mobileLeft};
        }
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

        thead{
            display: table;
            padding-right: 16px;

            th{
                text-align: left;
                height: 32px;
            }   
        }

        tbody{
            display: block;            
            height: 600px;                   
            overflow-y: scroll;

            td{
                padding: 4px 0 4px 2px;
            }

            td:first-child {
                border-radius: 6px 0 0 6px;
            }

            td:nth-last-child(2){
                border-radius: 0 6px 6px 0;
            }

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

    tr{
        min-height: 28px;

        th, td{
            //this might cover all overflow related things
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            min-height: 28px;
        }

        &:nth-child(2n) td{
            background-color: ${tableRow};
        }
    }

    /* .last-row{//not sure what this is for
        height: 100%;
    } */
    

    @media screen and (max-width: 960px){        
        margin: 0 auto;
        table td:last-child{
            border-radius: 0 6px 6px 0;
        }        
    }

    @media screen and (max-width: 706px){
        position: relative;
        table>div{margin: 0 auto;}
    }

    @media screen and (max-width: 480px){
        grid-row: 4;
        padding: 0;
        max-height: 800px;                

        table tbody{
            padding-right: 0;
            &::-webkit-scrollbar {
                width: 0px;  /* remove scrollbar space */            
            }
        }
        /* table td:first-child{
            width: 140px;
        } */
        
        .more-info {width: 100%;}
    }
`;

const columnStyles = (props) => (`
    position: ${props.position === 'relative' ? 'relative' : 'unset'};
    width: ${props.width + 'px'};
    max-width: ${props.maxWidth ? props.maxWidth + 'px' : 'unset'};
    @media screen and (max-width: 960px){
        ${props.mobile ? '' : 'display: none;'}}        
    }
`);

const ColumnHeader = styled.th`    
    ${props => columnStyles(props)}
    position: sticky;
`;

const ColumnData = styled.td`    
    ${props => columnStyles(props)}
`;

const Matches = styled(ColumnData)`    
    height: 32px;
    padding: 0;
    display: flex;                
    align-items: center;                     
`;
//maybe just export match icon instead
const matchIconStyles = (props) =>(`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props.theme.black};
    font-size: 12px;
    font-weight: 550;
    border-radius: 2.5px;
    width: 16px;
    height: 16px;
    margin-right: 2px;
    background-color: ${props.win ? win : loss};
`);

export { matchIconStyles };//used in mobile component

const MatchIcon = styled.span`
    ${props => matchIconStyles(props)}
`;

const LinkColumn = styled(ColumnData)`
    cursor: ${props => props.link ? 'pointer' : 'unset'};
    ${props => props.overflow ? overflowEllipsis : ''}
`;

const infoExpanderStyles = (props) =>(`
    width: ${props.width};
    display: none;            

    svg{
        width: 20px;
        height: 20px;
        fill: ${expanderFill};//should I use the prop instead?
        stroke: ${props.theme.black};
        stroke-width: 8px;
        cursor: pointer;
        position: relative;
        margin: unset;
    }

    @media screen and (max-width: 960px){
        display: table-cell;
        &> svg{
            visibility: visible;
        }                        
    }
`);

const InfoExpanderHeader = styled.th`    
    ${props => infoExpanderStyles(props)}
    position: sticky;
`;

const InfoExpanderData = styled.td`    
    ${props => infoExpanderStyles(props)}
`;

class TournamentsDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            banner: '',
            expandMoreInfo: false,
            moreInfoPlayer: false,
            query: ''
        };        
        this.searchPlayers = this.searchPlayers.bind(this);
        this.clearPlayerSearch = this.clearPlayerSearch.bind(this);
    }

    componentDidMount(){
        import(/* webpackMode: "eager" */ `../../public/tournament_banners/${this.props.tournament.shortName.split(' ')[0]}96px.png`).then(image =>{
            this.setState({banner: image.default});
        });      
    };    

    searchPlayers(e){
        this.setState({query: e.target.value});
    };

    clearPlayerSearch(){
        this.setState({query: ''});
    }

    render(){
        return(
            <TournamentHub className = 'tournament-details'>
                <Header>
                    <div>
                        <h2>{this.props.tournament.name}</h2>
                        <div>                
                            <p>{Moment(new Date(this.props.tournament.eventDate)).format('MMM D, YYYY')}</p>
                            <p>{this.props.tournament.entrantCount} Entrants</p>                    
                            <a href={this.props.tournament.bracketLink}><img src={Smashgg}></img></a>
                            <a href='#'><img src={Facebook}></img></a>   
                            {/* {this.props.tournament.eventPage ? <p>Event Page: {this.props.tournament.eventPage}</p> : null} */}
                        </div>                
                    </div> 
                </Header>
                <Banner>
                    <img src = {this.state.banner}/>
                </Banner>
                <Search>
                    <input type='text' value = {this.state.query} onChange = {this.searchPlayers} placeholder='Search Player' />
                    <ClearX visible = {this.state.query} onClick = {() => this.clearPlayerSearch()} position = {playerSearchPos}/>
                </Search>            
                <TableWrapper>
                    <table>                        
                            <thead>
                                <tr>
                                    <ColumnHeader width='160' position='relative' mobile = {true}>
                                        Player
                                        <SortArrows position = {playerSorterPos} baseColor = {theme.black} hoverColor = {theme.hoverRed}/>
                                    </ColumnHeader>
                                    <ColumnHeader width='60' position='relative' mobile = {true}>
                                        Place
                                        <SortArrows position = {placeSorterPos} baseColor = {theme.black} hoverColor = {theme.hoverRed}/>
                                    </ColumnHeader>
                                    <ColumnHeader width='60' position='relative'>
                                        Seed
                                        <SortArrows position = {seedSorterPos} baseColor = {theme.black} hoverColor = {theme.hoverRed}/>
                                    </ColumnHeader>
                                    <ColumnHeader width='60' mobile = {true}>Record</ColumnHeader>
                                    <ColumnHeader width='184'>Matches</ColumnHeader>
                                    <ColumnHeader width='160'>Loss To</ColumnHeader>
                                    <ColumnHeader width='160'>Eliminator</ColumnHeader>
                                    <InfoExpanderHeader width = '40'>More</InfoExpanderHeader>
                                </tr>
                            </thead>
                            <tbody>                                                    
                                {this.props.tournament.players
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
                                .map(p =>{                                    
                                    return <tr key={p.gamerTag}>
                                        <LinkColumn width='160' link = {p.gamerTag} mobile = {true}>{p.gamerTag}</LinkColumn>
                                        <ColumnData width='60' mobile = {true}>{p.placement}</ColumnData>
                                        <ColumnData width='60'>{p.seed}</ColumnData>
                                        <ColumnData width='60' mobile = {true}>{p.wins+' - '+p.losses}</ColumnData>
                                        <Matches width = '184'>                                        
                                            {p.matches.split('').map((m, i) => <MatchIcon key = {i} win = {m == 'W'}>{m}</MatchIcon>)}
                                        </Matches>
                                        <LinkColumn width='160' link = {p.loser}>{p.loser ? p.loser : '-----'}</LinkColumn>
                                        <LinkColumn width='144' link = {p.eliminator}>{p.eliminator ? p.eliminator : '-----'}</LinkColumn>                                        
                                        <InfoExpanderData width = '40' onClick = {() => this.setState({moreInfoPlayer: p, expandMoreInfo: true})}><CaretIcon/></InfoExpanderData>
                                    </tr>
                                })}
                                {/* <tr className='last-row'></tr> what is this for? */}
                            </tbody>                        
                    </table>
                    <MoreInfo player = {this.state.moreInfoPlayer} show = {this.state.expandMoreInfo} collapse = {() => this.setState({expandMoreInfo: false})}/>
                </TableWrapper>
            </TournamentHub>
        );
    };
};

export default TournamentsDetails;