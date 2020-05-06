import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const playerCardBase = '#BECFE3';
const playerCardBaseHover = '#EAEAEA';
const gamerTag =  'rgba(255, 127, 127, 0.8)';//get hex
const hubColors = {//may reorder for organization purposes
    player:['#AD1C5F', '#CD5173', '#D3838E', '#CD7B6D', '#A30401', '#FE0000', '#BE2321', '#B20606', 'none', 'none', 'none', 'none', '#E41E1D', '#F45C57', '#FC9D8B'],
    stats:['#2D5AD9', '#4588DF', '#58A6E4', '#36A1CF', '#0140A7', '#0068EB', '#1F52D2', '#063BC9', '#C5DDFF', '#576C99', '#BAD6FF', '#192F6B', '#217AF2', '#34A0F8', '#51C5FE'],
    tournaments:['#CAB799', '#D0B78E', '#D8C07A', '#CEB815', '#916600', '#F5AA00', '#B57F1F', '#AA7B07', '#FFD42F', '#9C7A20', '#FFD42D', '#573601', '#FAB70E', '#FBD415', '#FDE31A'],
    rivals:['#29AC9E', '#35C1A7', '#51C6AB', '#33BD5D', '#03691D', '#009D1C', '#1F862A', '#007C15', '#DADADA', '#5D5D5D', '#FFFFFF', '#292929', '#1EA73D', '#30CA5A', '#4AE77E']
};

const cardPositions = {
    player:'0',
    stats:'288px',
    tournaments:'576px',
    rivals:'862px'
}

const hoverStyles = (props) => `
    cursor: pointer;
    &:hover{
        background:
        linear-gradient(to top, ${hubColors[props.type][14]} 5%, transparent 5%),            
        linear-gradient(-135deg, ${playerCardBaseHover} 42%, transparent 42%),
        linear-gradient(-148deg, ${hubColors[props.type][12]} 72.5%, transparent 70%), 
        linear-gradient(-162deg, ${hubColors[props.type][13]} 80.5%, transparent 80.5%), 
        linear-gradient(-180deg, ${hubColors[props.type][14]} 95%, transparent 95%);

        &::after{
            background-color: ${hubColors[props.type][12]};
        }
    }
`;

const HubWrapper = styled.div`
    grid-column: ${props => props.grid};
    position: relative;    
    width: 300px;
    height: 268px; 
    &::before{
        content: '';
        width: 100%;
        height: 100%;
        clip-path: polygon(0% 15%, 0 100%, 100% 100%, 100% 0%, 15% 0%);
        background-color: ${props=> props.theme.black};
        position: absolute;
        display: block;
        right: 0;
        bottom: 0;
        border-left: 2.5px solid ${props=> props.theme.black};
        border-top: 6px solid ${props=> props.theme.black};
        box-sizing: content-box; 
    }

    @media screen and (max-width: 1360px) {  
        grid-column: ${props => props.responsiveGrid};
    }

    @media screen and (max-width: 1180px) {        
        grid-column: 2 / -1;
        margin: 20px auto 0;
        transition: top 0.5s linear;
        position: ${props => props.type === 'player' ? 'relative' : 'absolute'};               
        z-index: ${props => props.type === 'player' ? 110 : 100};
        top: ${props => cardPositions[props.type]};
        ${props => props.type !== 'player' ? 'left: 10px' : '' }
    }
`;

const Hub =  styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    height: 268px;
    max-width: 320px;
    max-height: 268px;
    background:
        linear-gradient(to top, ${props => hubColors[props.type][3]} 5%, transparent 5%),            
        linear-gradient(-135deg, ${() => playerCardBase} 42%, transparent 42%),
        linear-gradient(-148deg, ${props => hubColors[props.type][0]} 72.5%, transparent 70%), 
        linear-gradient(-162deg, ${props => hubColors[props.type][1]} 80.5%, transparent 80.5%), 
        linear-gradient(-180deg, ${props => hubColors[props.type][2]} 95%, transparent 95%);         
    background-repeat: no-repeat; 
    clip-path: polygon(0% 18%, 0 100%, 100% 100%, 100% 0%, 18% 0%);
    position: relative;
    z-index: 1;
    
    &::after{
        background-color: ${props => hubColors[props.type][4]};
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 13px;//don't like it but it works
        width: 20px;
        z-index: -1;
    }    

    *{
        font-family: sans-serif;
    }

    *:first-child{
        margin-top: auto;        
    }    

    img{
        z-index: 0;
        position: absolute;
        top: 0;
    }

    &>span{
        font-family: sans-serif;
        font-size: 28px; 
        font-weight: 700;
        color: ${props => props.theme.white};        
        margin-left: auto;
        z-index: 20;
        margin-right: 16px;
        text-transform: capitalize;  
        text-shadow: ${props => '1px -2px 0 ' + props.theme.black + 
                             ', -2px -2px 0 ' + props.theme.black + 
                             ' , -2px 2px 0 ' + props.theme.black + 
                             ' , 2px 2px 0 ' + props.theme.black};
    }

    ${props => props.type === 'player' ? '' : hoverStyles(props)}
    
    @media screen and (max-width: 1180px) {  
        ${props => props.type === 'player' ? hoverStyles(props) : '' }
    }
`;

const HubPreview = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: ${props => hubColors[props.type][8]};
    color: ${props => hubColors[props.type][9]};
    font-weight: 550;
    text-align: center;
    padding: 8px 0;
    width: 224px;//temp?
    border: 2px solid ${props => props.theme.black};        

    &:hover{
        border-color: ${props => props.theme.hoverRed};
        background-color: ${props => hubColors[props.type][10]};
        color: ${props => hubColors[props.type][11]};
    }
`;

const HubFooter = styled.div`
    width: 87.5%;
        position: relative;
        z-index: 20;

        &::before{
            content: '';
            width: 101.5%;
            height: 102.5%;
            clip-path: polygon(0% 33%, 0 100%, 100% 100%, 100% 33%, 95% 0%, 5% 0%);
            background-color: ${props => props.theme.black};
            position: absolute;
            display: block;
            bottom: 0px;
            right: -2.25px;  
        }

        div{                
            height: 40px;
            background-color: ${props => hubColors[props.type][5]};          
            z-index: 20;
            clip-path: polygon(0% 33%, 0 100%, 100% 100%, 100% 33%, 95% 0%, 5% 0%);
            
            div{                    
                clip-path: polygon(0% 0%, 0 100%, 82% 100%, 100% 0%);
                background: repeating-linear-gradient(115deg, 
                    ${props => hubColors[props.type][6]} 0 2px, 
                    ${props => hubColors[props.type][7]} 2px 4px);
                height: 100%;
                width: 100px;
            }
        }
`;

const GamerTag = styled.div`
    width: 72.5%;
    height: 28px;
    background-color: ${() => gamerTag};
    border: solid 2px ${props => props.theme.black};        
    z-index: 20;
    margin-bottom: 4px;
    text-align: center;    
    font-size: 20px;
    font-weight: 550;
`;

const HubCard =  (props) =>{
    const [charImage, setCharImage] = useState('');    
    const [preview, setPreview] = useState([]);    
    useEffect(() => {
        if(!props.player.gamerTag) return;
        switch(props.type){
            case 'player':
                import(/* webpackMode: "eager" */ `../../public/main_portraits/${props.player.mains ? props.player.mains.split(',')[0] : 'default' }.png`)
                .then(portrait => {
                    setCharImage(portrait.default);
                });
            break;
            case 'stats':
                const statsPreview = [
                    <React.Fragment><span>Set Record</span><span>{props.player.setWins} - {props.player.setLosses}</span></React.Fragment>,
                    <React.Fragment><span>Game Record</span><span>{props.player.gameWins} - {props.player.gameLosses}</span></React.Fragment>
                ];
                setPreview(statsPreview);
            break;
            case 'tournaments':
                axios.get('http://localhost:9001/api/players/tournamentListings/' + encodeURIComponent(props.player.gamerTag))
                .then(res => {
                    const tournamentsPreview = res.data.map(t => t.shortName).slice(0,5);
                    setPreview(tournamentsPreview);                                  
                });
            break;
            case 'rivals':
                axios.get('http://localhost:9001/api/players/rivals/' + encodeURIComponent(props.player.gamerTag))
                .then(res => {
                    const rivalsPreview = res.data
                    .sort((r1, r2) => r2.setLosses - r1.setLosses)
                    .map(r => (<span>{r.gamerTag}</span>)).slice(0,5);
                    setPreview(rivalsPreview);
                });
            break;
            default:
        }            
    }, [props.player]);   
    return <HubWrapper type = {props.type} grid = {props.grid} responsiveGrid = {props.responsiveGrid} onClick = {props.onClick}>
        <Hub type = {props.type}>
            {preview.length ? preview.map((content , i) => <HubPreview key = {i} type = {props.type}>{content}</HubPreview>) : null}
            <span>{props.type !== 'player' ? props.type : props.player && (props.player.mains ? props.player.mains.split(',')[0].slice(0,-1) : '') }</span>
            {props.type === 'player' ? <GamerTag>{props.player && props.player.gamerTag}</GamerTag> : null}
            <HubFooter type = {props.type}><div><div></div></div></HubFooter>
            {props.type === 'player' ? <img src={charImage}></img> : null}
        </Hub>        
    </HubWrapper>            
};

export default HubCard;