import React, {Component} from 'react';
import styled from 'styled-components';

import theme from '../styles/Theme';
import SmashBallIcon from './svgs/SmashBallIcon.jsx';
import PlayersIcon from './svgs/PlayersIcon.jsx';
import BracketIcon from './svgs/BracketIcon.jsx';
import EnvelopeIcon from './svgs/EnvelopeIcon.jsx';
import InfoIcon from './svgs/InfoIcon.jsx';

const iconDims = 28;

const StyledNavBar = styled.nav`
    display: grid;    
    position: fixed;
    margin: 0 240px;
    top: 8px;
    left: 0;
    right: 0;
    z-index: 250;                             
    align-items: center;
    margin: 0 auto;
    max-width: 860px;
`;

const NavList = styled.ul`
    height: 64px;//subject to change   
    display: flex;
    justify-content: space-between;
    padding: 0 16px;   
    list-style-type: none;
`;

const NavLink = styled.li`
    position: relative;
    z-index: 100;

    :first-child a{        
        border-radius: 20px 0 0 20px;      
        
        &::before, &::after{
            border-radius: 20px 0 0 20px;
            clip-path: polygon(0% 0%, 0% 100%, 85% 100%, 95% 0%);
        }
    } 

    :last-child a{        
        border-radius: 0 20px 20px 0;

        &::before, &::after{
            border-radius: 0 20px 20px 0;
            clip-path: polygon(15% 0%, 5% 100%, 100% 100%, 100% 0%);
        }            
    }

    a{
        width: 120px;
        display: flex;
        flex-direction: column;        
        align-items: center;            
        position: relative;
        padding-top: 4px;            
        margin: 4px 0;
        color: ${props => props.theme.navBarColor};
        text-decoration: none;
        cursor: pointer;            

        &:hover::before{
            background: repeating-linear-gradient(125deg, transparent 0 4px, rgba(255, 255, 255, 0.2) 4px 5px),
            linear-gradient(${props => 'to bottom, ' + props.primGradient + ', ' + props.secGradient});
        }        
        
        &::before{
            content: '';
            display: block;        
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;    
            background: repeating-linear-gradient(${props => '125deg, ' + props.theme.navBarPrimary +  ' 0 4px, ' + props.theme.navBarSecondary + ' 4px 5px'});                
            z-index: -100;
        }

        &:hover{

            color: ${props => props.theme.white};     

            svg{
                fill: ${props => props.theme.white};
            }

            &::before{
                border: solid 1.5px ${props => props.theme.black};
                box-shadow: inset 0 0 2.5px ${props => props.theme.black};
                text-shadow:
                -1px -1px 0 ${props => props.theme.black},  
                1px -1px 0 ${props => props.theme.black},
                -1px 1px 0 ${props => props.theme.black},
                1px 1px 0 ${props => props.theme.black};
            }

            &::after{
                content: '';
                display: block;
                position: absolute;
                top: 0; bottom: 0; left: 0; right: 0;                    
                transform: scale(1.06, 1.1);
                background-color: ${props => props.theme.navBarHover};
                z-index: -200;                 
            }               
        }        

        span{
            font-size: 18px;
            font-weight: 550;
        }        
    }     
`;

class NavBar extends Component{
    constructor(props){
        super(props);        
    }    
    render(){
        return (
            <StyledNavBar>
                <NavList>
                    <NavLink primGradient = {theme.homeNavPrimary} secGradient = {theme.homeNavSecondary}>
                        <a href='javascript:void(0)'>
                            <SmashBallIcon dims = {iconDims} fill={theme.navBarColor}/>
                            <span>Home</span>
                        </a>
                    </NavLink>
                    <NavLink primGradient = {theme.playersNavPrimary} secGradient = {theme.playersNavSecondary}>
                        <a href='javascript:void(0)'>
                            <PlayersIcon dims = {iconDims} fill={theme.navBarColor}/>
                            <span>Players</span>
                        </a>
                    </NavLink>
                    <NavLink primGradient = {theme.tournamentsNavPrimary} secGradient = {theme.tournamentsNavSecondary}>
                        <a href='javascript:void(0)'>
                            <BracketIcon dims = {iconDims} fill={theme.navBarColor}/>
                            <span>Tournaments</span>
                        </a>
                    </NavLink>
                    <NavLink primGradient = {theme.newsNavPrimary} secGradient = {theme.newsNavSecondary}>
                        <a href='javascript:void(0)'>
                            <EnvelopeIcon dims = {iconDims} fill={theme.navBarColor}/>
                            <span>News</span>
                        </a>
                    </NavLink>
                    <NavLink primGradient = {theme.aboutNavPrimary} secGradient = {theme.aboutNavSecondary}>
                        <a href='javascript:void(0)'>
                            <InfoIcon dims = {iconDims} fill={theme.navBarColor}/>
                            <span>About</span>
                        </a>
                    </NavLink>
                </NavList>                        
            </StyledNavBar>
        )
    }
}

export default NavBar;