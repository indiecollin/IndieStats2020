import React, {Component} from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import NavTriangle from './NavTriangle.jsx';

const headerPrimary = '#C00071';
const headerSecondary = '#E31B73';
const background =  '#FBCFE8';
const playersPerPage = 5;

const PowerRanks = styled.div`
    max-width: 424px;    
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-self: center;        

    h2{
        position: relative;
        background-color: ${headerPrimary};
        clip-path: polygon(0% 0%, 3% 100%, 97% 100%, 100% 0%);
        margin-bottom: 8px;
        color: ${props => props.theme.white};          
        text-align: center;   
        width: 424px;     

        &:before{
            display: block;
            position: absolute;
            content:'';
            background-color: ${headerSecondary};
            width: 24px;
            height: 100%;
            left: 2px;
            transform: skew(25deg);            
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
            transform: skew(-25deg);
        }
    }
               
    &>div{           
        display: flex;
        flex-direction: column;         
        position: relative;        
        text-align: center;    
        align-self: center;       
        border: solid 2px ${headerSecondary};
        background-color: ${background};
        justify-content: space-around;
        padding: 0 32px;
        min-width: 396px;
        height: 244px;        
        
        &>div{            
            display: flex;        
            flex-direction: column;           
            justify-content: space-evenly;
            height: 100%;
            opacity: ${props => props.sliding ? '0' : '1' };

            &>img{                         
                height: 32px;
                width: 32px;                 
            }

            span{
                display: flex;
                justify-content: center;
                align-items: center;            
                font-size: 18px;     
                font-weight: 550;
                cursor: pointer;
                min-width: 144px;                                                 
                color: ${props => props.theme.black};
            }

            div{           
                display: flex;
                min-width: 108px;
                justify-content: space-evenly;

                img{         
                    height: 32px;
                    width: 32px;                    
                }
            }
        }       

        button{
            position: absolute;            
            &:first-child{
                left: 0;
            }            
            &:last-child{
                right: 0;
            }
        } 
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
            min-width: unset;
            padding: 0 16px;
            height: 180px;            

            &>div{                
                img{
                    min-width: 32px;
                }

                span{
                    font-size: 16px;                
                    min-width: 128px;
                }                
            }                                 
        }        
    } 
`;

class HomePowerRanks extends Component{    
    constructor(props){
        super(props);
        this.state = {
            playerIcons: [...Array(5).fill({})],            
            pageStart: 0,
            pageEnd: 4,
            sliding: false,
            ranks: []
        }
        this.selectPlayer = this.selectPlayer.bind(this);
        this.pageLeft = this.pageLeft.bind(this);
        this.pageRight = this.pageRight.bind(this);
    }

    componentDidMount(){                    
        axios.all([ axios.get('http://localhost:9001/api/players/powerRanks')])
        .then(axios.spread((powerRanks) => {
            let players = powerRanks.data.map(playerData => {                
                const mains = playerData.mains.split(',')
                let player = {
                    gamerTag: playerData.gamerTag,                    
                    primary: mains[0] + '.png'
                }                    
                if(playerData.sponsor) player.sponsor = playerData.sponsor + '.png'                
                if(mains[1]) player.secondary = mains[1] + '.png'
                if(mains[2]) player.tertiary = mains[2] + '.png'
                return player;         
            });
            this.setState({ranks: players});
            let imports = players.map(player => {
                let playerImports = [];
                playerImports.push(import(/* webpackMode: "eager" */ `../../public/char_icons/${player.primary}`));
                if(player.sponsor){
                    playerImports.push(import(/* webpackMode: "eager" */ `../../public/sponsors/${player.sponsor}`));
                }
                if(player.secondary){
                    playerImports.push(import(/* webpackMode: "eager" */ `../../public/char_icons/${player.secondary}`));
                    if(player.tertiary){
                        playerImports.push(import(/* webpackMode: "eager" */ `../../public/char_icons/${player.tertiary}`));
                    }
                }
                return playerImports;
            });        
            players.forEach((player, i) => {
                Promise.all(imports[i]).then(images => {
                    let icons = {primary: images.shift().default};
                    if(player.sponsor){
                        icons.sponsor = images.shift().default;                    
                    }
                    if(player.secondary){
                        icons.secondary = images.shift().default;                    
                        if(player.tertiary){
                            icons.tertiary = images.shift().default;
                        }
                    }
                    let playerIcons = [...this.state.playerIcons];
                    playerIcons[i] = icons;
                    this.setState({playerIcons: playerIcons});
                });
            }); 
        }));       
    };  

    selectPlayer(gamerTag){
        this.props.history.push({pathname: '/players/' + gamerTag})
    }

    pageLeft(){
        this.setState(prevState => {
            return {
                pageStart:  Math.max(0, prevState.pageStart - playersPerPage),
                pageEnd:  Math.max(playersPerPage - 1, prevState.pageEnd - playersPerPage),
                sliding: true
            }
        });
        setTimeout(() => this.setState({sliding: false}),0);
    }

    pageRight(){        
        this.setState(prevState => {
            return {
                pageStart:  Math.min(this.state.ranks.length - playersPerPage, prevState.pageStart + playersPerPage),
                pageEnd:  Math.min(this.state.ranks.length - 1, prevState.pageEnd + playersPerPage),
                sliding: true
            }
        });
        setTimeout(() => this.setState({sliding: false}),0);
    }

    render(){      
        return(
            <PowerRanks sliding = {this.state.sliding}>            
                <h2>Power Ranks</h2>
                <div>
                    <NavTriangle left={true} onClick = {this.pageLeft} disabled = {!this.state.pageStart}/>
                    <div>
                    {
                        this.state.ranks
                        .filter((p, i) => {return (i >= this.state.pageStart && i <= this.state.pageEnd)})
                        .map((player, i) =>{
                            return (                        
                                <CSSTransition appear = {false} in = {this.state.sliding} key = {player.gamerTag} timeout = {300} classNames = 'slide' component = {null}>
                                <div key = {player.gamerTag} onClick = {() => this.selectPlayer(player.gamerTag)}> 
                                    {player.sponsor ? <img src = {this.state.playerIcons[i+this.state.pageStart].sponsor}/> : <img style = {{visibility: 'hidden'}}/>}
                                    <span>{player.gamerTag}</span>
                                    <div>
                                        {player.primary?<img src= {this.state.playerIcons[i+this.state.pageStart].primary}/>:null}
                                        {player.secondary?<img src= {this.state.playerIcons[i+this.state.pageStart].secondary}/>:null}
                                        {player.tertiary?<img src= {this.state.playerIcons[i+this.state.pageStart].tertiary}/>:null}                                    
                                    </div>
                                </div>
                                </CSSTransition>                
                            )
                        })
                    }
                    </div>                                           
                    <NavTriangle left={false} onClick = {this.pageRight} disabled = {this.state.pageEnd >= this.state.ranks.length-1}/>
                </div>
            </PowerRanks>
        );
    }
}

export default withRouter(HomePowerRanks);