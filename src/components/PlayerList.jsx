import React, {Component} from 'react';
import styled from 'styled-components';

import theme from '../styles/Theme';
import ClearX from './ClearX.jsx';
import NavTriangle from './NavTriangle.jsx';
import OptionSwitch from './OptionSwitch.jsx';
import SortArrows from './SortArrows.jsx';
import Expander from './Expander.jsx';

const clearXPos = {
    top: '6px',
    right: '38px'
};

const leftSorterPos = {
    left: '4px'
};

const rightSorterPos = {
    right: '4px'
};

const background = '#DBE6EC';

const PlayerListWrapper = styled.div`
    position: fixed;
    top: 100px;    
    z-index: 100; 
    left:  4%;
    
    @media screen and (max-width: 1320px) {        
        position: relative;
        margin-left: auto;
        left: unset;
    }
    @media screen and (max-width: 706px) {        
        margin-right: auto;                
    }
`;

const StyledPlayerList = styled.div`
    display: flex;
    flex-direction: column;                            
    padding-top: 4px;
    min-width: 300px;
    height: ${props => props.expanded ? '516px' : 'max-content'};
    min-height: 290px;
    max-height: ${props => props.expanded ? '516px' : '290px'};
    transition: max-height 0.5s linear;
    overflow: hidden;
    background: ${props => props.theme.white};
`;

const SearchWrapper = styled.div`
    display: flex;
    position: relative;
    margin: 8px 0 8px;
    min-height: 24px;            
`;

const ListSearch = styled.input`
    width: 80%;  
    height: 24px;       
    margin: 0 auto;    
    ${props => props.disabled ? 'background-color: '+ props.theme.disabledGreyPrim +';' : ''}
    ${props => props.disabled ? 'border: 2px solid ' + props.theme.disabledGreySec + ';' : ''}
    
    &::-webkit-input-placeholder {
        text-align: center;
    }
`;

const PlayerListing = styled.div`    
    height: 36px;
    min-height: 36px;
    background-color: ${background};
    display: flex;
    margin: 0 8px;
    text-align: center;
    margin-bottom: 8px;
    border: solid ${props => props.theme.stripeBlack} 1.5px;
    cursor: pointer;
    
    &:hover{
        background-color: ${props => props.theme.white};
    }

    div:first-child{
        width: 62%;  
        font-weight: 550;
        color: ${props => props.theme.stripeBlack};  
        padding: 8px 0;
        position: relative;                         
    }

    div:last-child{
        color: ${props => props.theme.white};
        width: 38%;
        clip-path: polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%);
        padding-left: 12px;
        background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ' 0 2px, ' + props.theme.stripeBlack + ' 2px 4px'});
        padding: 8px 0;    
        position: relative;    
    }
`;

const Spacer = styled.div`   
    flex-grow: 1;
    height: 516px;
`;

class PlayerList extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            all: true,
            expanded: true,
            page: 1,
            limit: 10,
            sort: true,//true = by name, false = by record
            inverse: false,
            query: ''
        }        

        this.selectPlayer = props.selectPlayer;
        this.searchPlayers = this.searchPlayers.bind(this);
        this.clearPlayerSearch = this.clearPlayerSearch.bind(this);
        this.setSort = this.setSort.bind(this);
        this.page = this.page.bind(this);
        this.expand = this.expand.bind(this);            
        this.rightNavDisable = this.rightNavDisable.bind(this);
    }
    
    searchPlayers(event){
        this.setState({page: 1, query: event.target.value})
    }

    clearPlayerSearch(){
        this.setState({page: 1, query: ''})
    } 

    toggleMode(mode){
        this.setState({page: 1, all: mode, query: ''})        
    }

    setSort(sort, inverse, event){
        event.stopPropagation()
        this.setState({page: 1, sort: sort, inverse: inverse})        
    }

    page(direction){       
        this.setState((prevState) => ({
            page: direction ? prevState.page + 1 : prevState.page - 1
        }));        
    }

    rightNavDisable(){
        if(!this.state.all){
           return this.state.page === parseInt(this.props.powerRanks.filter(p => p.powerRank).length/this.state.limit)
        }
        else{
            return this.state.page-1 === parseInt((this.props.players.filter(p => !this.state.query || p.gamerTag.toLowerCase().startsWith(this.state.query.toLowerCase())).length-1)/this.state.limit)
        }        
    }

    expand(expanding){//assumes mobile limit is half of desktop limit        
        this.setState((prevState) => ({
            expanded: !prevState.expanded,
        }));
        if(expanding){            
            this.setState((prevState) => ({
                limit: 10,
                page: Math.ceil(prevState.page / 2)
            }));
        }     
        else{            
            setTimeout(() => {
                this.setState((prevState) => ({    
                    limit: 5,
                    page: prevState.page * 2 - 1
                }));
            }, 500) 
        }      
    }
            
    render(){
        return <PlayerListWrapper>
            <StyledPlayerList expanded = {this.state.expanded}>
                <OptionSwitch selected = {this.state.all} left='Ranks' onToggle = {() => this.toggleMode(!this.state.all)} right='All' background/>                
                <SearchWrapper>
                    <NavTriangle onClick = {() => this.page(false)} left={true} disabled = {this.state.page-1 === 0}/>
                    <ListSearch value={this.state.query} onChange={this.searchPlayers} placeholder = {this.state.all ? 'Search Players' : ''} disabled = {!this.state.all}/>                                
                    <ClearX onClick = {() => this.clearPlayerSearch()} visible = {this.state.query} position = {clearXPos}/>
                    <NavTriangle onClick = {() => this.page(true)} left={false} disabled = {this.rightNavDisable()}/>
                </SearchWrapper>
                {
                    (this.state.all ? this.props.players : this.props.powerRanks)
                    .filter(p => this.state.all || p.powerRank)//power rank filtering                
                    .sort((p1, p2) => {                     
                        if(!this.state.all){
                            return p1.powerRank - p2.powerRank                        
                        }
                        else if(this.state.sort){
                            return this.state.inverse ? -1 : 1
                        }
                        else{
                            return  ((p2.setWins - p2.setLosses) - (p1.setWins - p1.setLosses)) * (this.state.inverse ? -1 : 1)
                        }  
                    })
                    .filter(p => !this.state.query || p.gamerTag.toLowerCase().startsWith(this.state.query.toLowerCase()))//query filtering
                    .filter((p,i) => i >= ((this.state.page - 1) * this.state.limit) && i < (this.state.page) * this.state.limit )//pagination filtering
                    .map((p, i) =>
                        <PlayerListing key = {p.gamerTag + i}>
                            <div>                                
                                {!i && this.state.all ? <SortArrows upsort = {(e) => this.setSort(true, false, e)} downsort = {(e) => this.setSort(true, true, e)} position = {leftSorterPos} baseColor = {theme.stripeBlack} hoverColor = {theme.hoverRed}/> : null}
                                {p.gamerTag}
                            </div>
                            <div>
                                {!i && this.state.all ? <SortArrows upsort = {(e) => this.setSort(false, false, e)} downsort = {(e) => this.setSort(false, true, e)} position = {rightSorterPos} baseColor = {theme.white} hoverColor = {theme.hoverRed}/> : null}
                                {p.setWins + ' - ' + p.setLosses}
                            </div>                        
                        </PlayerListing>                    
                    )
                }
                <Spacer/> 
        </StyledPlayerList>    
            <Expander expanded = {this.state.expanded} onClick = {() => this.expand(!this.state.expanded)}/>	
        </PlayerListWrapper>         
    }
}

export default PlayerList;