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
    outline: none;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    
    svg{                                    
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
    }
`;

class NavTriangle extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <NavButton onClick = {() => this.props.onClick()} left = {this.props.left} disabled = {this.props.disabled}>
                <TrianglePagingIcon fill = {this.props.disabled ? theme.disabledGreyPrim : navTrianglePrimary} stroke = {this.props.disabled ? theme.disabledGreySec : navTriangleSecondary} />
            </NavButton>
        );
    }
};

export default NavTriangle;