import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import SmashBallIcon from './svgs/SmashBallIcon.jsx';
import PlayersIcon from './svgs/PlayersIcon.jsx';
import BracketIcon from './svgs/BracketIcon.jsx';
import EnvelopeIcon from './svgs/EnvelopeIcon.jsx';
import InfoIcon from './svgs/InfoIcon.jsx';

const navBarPrimary = '#313232';
const navBarSecondary = '#3F4141';
const navBarHover = '#FFFF00';
const navBarColor = '#E8E8E8';
const homeNavPrimary = '#1C9E00';
const homeNavSecondary = '#68E300';
const playersNavPrimary = '#F81C64';
const playersNavSecondary = '#FF498C';
const tournamentsNavPrimary = '#F90101';
const tournamentsNavSecondary = '#C30203';
const newsNavPrimary = '#FA6200';
const newsNavSecondary = '#FFC70D';
const aboutNavPrimary = '#0579FF';
const aboutNavSecondary = '#00B5F3';

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

    @media screen and (max-width: 706px) {
        max-width: 420px;
        width: 100%;
        margin: 0 auto;
    }

    @media screen and (max-width: 480px) {        
        max-width: 320px;        
    }
`;

const NavList = styled.ul`
    height: 64px;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0 16px;
    list-style-type: none;

    @media screen and (max-width: 706px) {
        padding: 0 8px;
    }
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

    :last-child span{        
        border-radius: 0 20px 20px 0;

        &::before, &::after{
            border-radius: 0 20px 20px 0;
            clip-path: polygon(15% 0%, 5% 100%, 100% 100%, 100% 0%);
        }            
    }

    a, &>span{
        width: 120px;
        display: flex;
        flex-direction: column;        
        align-items: center;            
        position: relative;
        padding-top: 4px;            
        margin: 4px 0;
        color: ${() => navBarColor};
        text-decoration: none;
        cursor: pointer;            

        &:hover::before{
            background: repeating-linear-gradient(125deg, transparent, transparent 4px, rgba(255, 255, 255, 0.2) 4px, rgba(255, 255, 255, 0.2)  5px),
                        linear-gradient(${props => 'to bottom, ' + props.primGradient + ', ' + props.secGradient});
        }        
        
        &::before{
            content: '';
            display: block;        
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;    
            background: repeating-linear-gradient(${'125deg, ' + navBarPrimary +  ', ' + navBarPrimary + ' 4px, ' + navBarSecondary + ' 4px, ' + navBarSecondary + ' 5px'});            
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
                background-color: ${navBarHover};
                z-index: -200;
            }               
        }        

        span{
            font-size: 16px;
            font-weight: 550;
        }   

        @media screen and (max-width: 706px) {
            padding: 8px 0;
            width: 56px;
            span{
                display: none;
            }
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
                    <NavLink primGradient = {homeNavPrimary} secGradient = {homeNavSecondary}>
                        <Link to='/'>
                            <SmashBallIcon dims = {iconDims} fill={navBarColor}/>
                            <span>Home</span>
                        </Link>
                    </NavLink>
                    <NavLink primGradient = {playersNavPrimary} secGradient = {playersNavSecondary}>
                        <Link to='/players'>                           
                            <PlayersIcon dims = {iconDims} fill={navBarColor}/>
                            <span>Players</span>                            
                        </Link>
                    </NavLink>
                    <NavLink primGradient = {tournamentsNavPrimary} secGradient = {tournamentsNavSecondary}>
                        <Link to='/tournaments'>
                            <BracketIcon dims = {iconDims} fill={navBarColor}/>
                            <span>Tournaments</span>
                        </Link>
                    </NavLink>
                    <NavLink primGradient = {newsNavPrimary} secGradient = {newsNavSecondary}>
                        <Link to='/news'>
                            <EnvelopeIcon dims = {iconDims} fill={navBarColor}/>
                            <span>News</span>
                        </Link>
                    </NavLink>
                    <NavLink primGradient = {aboutNavPrimary} secGradient = {aboutNavSecondary} className = 'ignore-react-onclickoutside'>
                        <span onClick = {() => this.props.about('about')}>
                            <InfoIcon dims = {iconDims} fill={navBarColor}/>
                            <span>About</span>
                        </span>
                    </NavLink>
                </NavList>                        
            </StyledNavBar>
        )
    }
}

export default NavBar;