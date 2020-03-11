import React, {Component} from 'react';
import styled from 'styled-components';

import theme from '../styles/Theme';
import ClearX from './ClearX.jsx';
import NavTriangle from './NavTriangle.jsx';
import SortArrows from './SortArrows.jsx';
import Expander from './Expander.jsx';

const listingGrey = '#DBE6EC';

const clearXPos = {
    top: '6px',
    right: '38px'
};

const leftSorterPos = {
    left: '4px'
}

const rightSorterPos = {
    right: '4px'
}


const PlayerListWrapper = styled.div`
    position: fixed;
    top: 90px;    
    z-index: 100; 
    left:  7.6%;
    /* @media screen and (max-width: 1440px) {left: 40px;}
    @media screen and (max-width: 1276px) {
        position: static;
        margin: 90px 20px 0 calc((100vw - 640px) * 0.5);//640px is the combined width of the player list and infu hub cards;        
    }
    @media screen and (max-width: 707px) {//not sure why this isn't working at 706px
        position: static;        
        //margin: 90px calc((100vw - 300px) * 0.5) 0;
        margin: 90px auto 0;
    } */
`;

const StyledPlayerList = styled.div`
    display: flex;
    flex-direction: column;                            
    padding-top: 4px;
    min-width: 300px;//
    max-width: 400px;//why?
    height: max-content;
    min-height: 290px;    
    //max-height: 300px;
    transition: max-height 0.5s linear;
    overflow: hidden;
    background: linear-gradient(${props => props.theme.white + ', ' + props.theme.navBarColor});//rename?

    //use a prop
    /* &.expanded{
        max-height: 540px;
        height: 512px;
    } */    
`;

const ListOptions = styled.div`    
    display: flex;        
    background-color: ${props => props.theme.white}; 
    position: relative;
    z-index: 10;
    border-radius: 10px;
    background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ' 0 2px, ' + props.theme.stripeBlack + ' 2px 4px'});  
    border-bottom: solid 0.2px ${props => props.theme.stripeGrey}; 
    width: 75%;//temp
    margin: 0 auto 4px;
    min-height: 30px;    

    button:first-child{ 
        clip-path: polygon(0% 0%, 0% 100%, 85% 100%, 95% 0%);
        z-index: 20;        
    }     

    button:last-child{                    
        clip-path: polygon(15% 0%, 5% 100%, 100% 100%, 100% 0%);        
    }               
`;

const OptionsButton = styled.button`
    border: 1.5px solid ${props => props.theme.stripeGrey};
    border-radius: 10px;
    -webkit-text-stroke: ${props => props.theme.optionsTextStroke} 0.5px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 19px;
    width: 100%;
    background-color: ${props => props.selected ? props.theme.white : listingGrey};
    outline: none;                        
    position: ${props => props.selected ? 'relative' : 'static'};
    cursor: ${props => props.selected ? 'default' : 'pointer'};

    &:hover{        
        border: 1.5px solid ${props => props.selected ? props.theme.stripeGrey : props.theme.hoverRed};
        background-color: ${props => props.theme.white};
    }  
`;

const SearchWrapper = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 8px;
    min-height: 24px;            
    
    svg{            
        //right: 33px;
        //top: 5px;      
    }
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
    background-color: ${() => listingGrey};
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

class PlayerList extends Component {

    constructor(props, context){
        super(props, context)                    
    }
            
    render(){                                     
        return <PlayerListWrapper>
            <StyledPlayerList>                   
                <ListOptions>
                    <OptionsButton onClick = {false} selected = {!this.props.all}>Ranks</OptionsButton>                        
                    <OptionsButton onClick = {false} selected = {this.props.all}>All</OptionsButton>                            
                </ListOptions>
                <SearchWrapper>
                    <NavTriangle left={true}/>
                    <ListSearch disabled = {!this.props.all} placeholder = {this.props.all ? 'Search Player' : ''}/>                                
                    <ClearX visible = {true} position = {clearXPos}/>
                    <NavTriangle left={false} disabled = {true}/>
                </SearchWrapper>
                {
                    this.props.players
                    .map( (p, i) =>                                        
                        <PlayerListing key = {p.gamerTag}>
                            <div>                                
                                {!i ? <SortArrows position = {leftSorterPos} baseColor = {theme.stripeBlack} hoverColor = {theme.hoverRed}/> : null}
                                {p.gamerTag}
                            </div>
                            <div>
                                {!i ? <SortArrows position = {rightSorterPos} baseColor = {theme.white} hoverColor = {theme.hoverRed}/> : null}
                                {p.setWins + ' - ' + p.setLosses}
                            </div>                        
                        </PlayerListing>                    
                    )                
                }         
        </StyledPlayerList>    
            <Expander expanded = {true}/>	
        </PlayerListWrapper>         
    }
}

export default PlayerList;