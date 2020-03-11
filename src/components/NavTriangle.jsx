import React, {Component} from 'react';
import styled from 'styled-components';

import theme from '../styles/Theme';
import TrianglePagingIcon from './svgs/TrianglePagingIcon.jsx';
const navTrianglePrimary = '#FF5733';
const navTriangleSecondary ='#FF9600';

const NavButton = styled.button`    
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    svg{
        cursor: pointer;                                
        width: 32px;
        height: 32px;  
        visibility: visible;        
        stroke-width:2px;      
        stroke-linejoin: round;   
        position: relative;
        margin: 0 -8px 0 0;  
        top: ${props => props.left ? '-6px' : '-4px'};
        right: ${props => props.left ? '8px' : '0px'};
        ${props => props.left ? 'transform: scale(1) rotate(-180deg);' : ''}

        &.disabled{
            fill: ${props => props.theme.disabledPrimGrey};
            stroke: ${props => props.theme.disabledSecGrey};
            cursor: default;
            .cls-1{
                fill: ${props => props.theme.disabledPrimGrey};
            }
        }        
    }
`;

class NavTriangle extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <NavButton onClick = {() => this.props.onClick()} left = {this.props.left}>
                <TrianglePagingIcon fill = {this.props.disabled ? theme.disabledGreyPrim : navTrianglePrimary} stroke = {this.props.disabled ? theme.disabledGreySec : navTriangleSecondary} />
            </NavButton>
        );
    }
};

export default NavTriangle;