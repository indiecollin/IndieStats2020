import React, {Component} from 'react';
import styled from 'styled-components';
import NavTriangle from './NavTriangle.jsx';

const headerPrimary = '#C00071';
const headerSecondary = '#E31B73';
const background =  '#FBCFE8';

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
                min-width: 108px;    
                display: flex;

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
            playerIcons: [...Array(5).fill({})]//might not need these
        }
    }

    componentDidMount(){                
        let imports = this.props.ranks.map(player => {
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
        this.props.ranks.forEach((player, i) => {
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
    }    
    render(){      
        return(
            <PowerRanks>            
                <h2>Power Ranks</h2>
                <div>
                    <NavTriangle left={true}/>
                    <div>                
                    {
                        this.props.ranks
                        //.filter((player, index) => {return (index >= this.props.playerListStart && index <= this.props.playerListEnd)})
                        .map((player, i) =>{
                            return (                            
                                <div key = {player.gamerTag}>                                    
                                    {player.sponsor ? <img src = {this.state.playerIcons[i].sponsor}/> : <img style = {{visibility: 'hidden'}}/>}
                                    <span>{player.gamerTag}</span>
                                    <div>
                                        {player.primary?<img src= {this.state.playerIcons[i].primary}/>:null}
                                        {player.secondary?<img src= {this.state.playerIcons[i].secondary}/>:null}
                                        {player.tertiary?<img src= {this.state.playerIcons[i].tertiary}/>:null}                                    
                                    </div>
                                </div>                            
                            )
                        })
                    }                             
                    </div>
                    <NavTriangle left={false}/>
                </div>
            </PowerRanks>
        );
    }
}

export default HomePowerRanks;