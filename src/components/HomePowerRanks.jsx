import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NavTriangle from './NavTriangle.jsx';

const headerPrimary = '#C00071';
const headerSecondary = '#E31B73';
const background =  '#FBCFE8';

const PowerRanks = styled.div`
    max-width: 424px;
    width: 424px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-self: center;    
    margin-bottom: 20px;

    h2{
        position: relative;
        background-color: ${()=> headerPrimary};
        clip-path: polygon(0% 0%, 3% 100%, 97% 100%, 100% 0%);
        margin-bottom: 8px;
        color: ${props => props.theme.white};          
        text-align: center;   
        width: 424px;     

        &:before{
            display: block;
            position: absolute;
            content:'';
            background-color: ${()=> headerSecondary};
            width: 24px;
            height: 100%;
            left: 2px;
            transform: skew(25deg);            
        }

        &:after{
            display: block;
            position: absolute;
            content:'';
            background-color: ${()=> headerSecondary};
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
        border: solid 2px ${()=> headerSecondary};
        background-color: ${()=> background};
        justify-content: space-around;
        padding: 0 32px;
        max-width: 384px;
        width: 332px;
        height: 240px;   
        
        &>div{
            width: 320px;
            display: flex;        
            flex-direction: column;           
            justify-content: space-evenly;
            height: 100%;

            &>img{         
                //min-width: 64px;                
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
                justify-content: space-evenly;         
                img{         
                    height: 32px;
                    width: 32px;                    
                }
            }
        }       
        button{
            position: absolute;
            top: 108px;
            &:first-child{
                left: 0;
            }            
            &:last-child{
                right: 0;
            }
        } 
    }
`;

const HomePowerRanks = (props) => {    
    const [playerIcons, setPlayerIcons] = useState(Array(5).fill({}));
    useEffect(() => {//this can be down using 2 loops instead of using an image indexer
        let imports = [];
        props.ranks.forEach(player => {
            imports.push(import(/* webpackMode: "eager" */ `../../public/char_icons/${player.primary}`));
            if(player.sponsor){
                imports.push(import(/* webpackMode: "eager" */ `../../public/sponsors/${player.sponsor}`))
            }
            if(player.secondary){
                imports.push(import(/* webpackMode: "eager" */ `../../public/char_icons/${player.secondary}`))
                if(player.tertiary){
                    imports.push(import(/* webpackMode: "eager" */ `../../public/char_icons/${player.tertiary}`))
                }
            }
        });
        Promise.all(imports).then(images => {
            let imageIndex = 0;
            let icons = [];         
            props.ranks.forEach((player, playerIndex) => {
                icons[playerIndex] = {primary: images[imageIndex].default};
                imageIndex++;
                if(player.sponsor){
                    icons[playerIndex].sponsor = images[imageIndex].default;
                    imageIndex++;
                }
                if(player.secondary){
                    icons[playerIndex].secondary = images[imageIndex].default;
                    imageIndex++;
                    if(player.tertiary){
                        icons[playerIndex].tertiary = images[imageIndex].default;
                        imageIndex++;
                    }
                }
            });
            setPlayerIcons(icons);
        })             
      });
    return(
        <PowerRanks>            
            <h2>Power Ranks</h2>
            <div>
                <NavTriangle left={true}/>
                <div>                
                {
                    props.ranks
                    //.filter((player, index) => {return (index >= this.props.playerListStart && index <= this.props.playerListEnd)})
                    .map((player, i) =>{
                        return (                            
                            <div key = {player.gamerTag}>
                                {/*player.sponsor ? <img src = {() => import( /* webpackChunkName: "imageTest" *//* './ImageTest.jsx').then(module => {})}/> : <span/>*/}
                                {player.sponsor ? <img src = {playerIcons[i].sponsor}/> : <img style = {{visibility: 'hidden'}}/>}
                                <span>{player.gamerTag}</span>
                                <div>
                                    {player.primary?<img src= {playerIcons[i].primary}/>:null}
                                    {player.secondary?<img src= {playerIcons[i].secondary}/>:null}
                                    {player.tertiary?<img src= {playerIcons[i].tertiary}/>:null}                                    
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

export default HomePowerRanks;

// @media screen and (max-width: 480px) {    
//     width: 320px;
//     margin-left: auto;
//     margin-right: auto;

//     .header{
//         width: 320px;
//     }

//     .table{
//         width: 300px;
//         padding: 0 16px;

//         .row{
//             .sponsor{
//                 min-width: 36px;
//             }

//             .gamer-tag{
//                 font-size: 16px;                
//                 min-width: 128px;                
//             }

//             .mains{
//                 min-width: 80px;
//             }
//         }

//         .side-triangle-icon{
//             right: -12px;
//              &.left{
//                 left: -12px;
//              }             
//         }

//     }
// } 
