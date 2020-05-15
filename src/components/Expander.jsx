import React from 'react';
import styled from 'styled-components';

import CaretIcon from './svgs/CaretIcon.jsx';
import theme from '../styles/Theme';

const caretDims = 12;
const ExpanderWrapper = styled.div`    
    position: relative;
    margin-top: ${props => props.expanded ? '4px' : '20px'};
    transition: margin .5s linear;
    width: 75%;        
    cursor: pointer;        
    display: flex;
    flex-direction: column;
    align-items: center;    

    div{
        background-color: ${props => props.theme.black};
    }

    span{                          
        display: block;
        position: absolute;
        top: 2px;
        ${props => props.expanded ? 'transform: rotate(-180deg);' : ''}       
    }
`;

const ExpanderWing = styled.div`
    width: 32px;
    height: 8px;    

    &:before{
        display: block;
        position: absolute;
        content: '';
        width: 150px;
        height: 8px;
        background-color: ${props => props.theme.black};
        left: 0;
        transform: skew(60deg);
    }

    &:after{
        display: block;
        position: absolute;
        content: '';
        width: 150px;
        height: 8px;
        background-color: ${props => props.theme.black};
        right: 0;
        transform: skew(-60deg);
    }
`;

const ExpanderPoint = styled.div`
    width: 28px;
    height: 10px;

    &:before{
        display: block;
        position: absolute;
        content: '';
        width: 50px;
        height: 10px;
        background-color: ${props => props.theme.black};
        left: 50%;        
        transform: skew(-70deg);
    }

    &:after{
        display: block;
        position: absolute;
        content: '';
        width: 50px;
        height: 10px;
        background-color: ${props => props.theme.black};
        right: 50%;
        transform: skew(70deg);
    }
`;

const Expander = (props) => {        
    return <ExpanderWrapper onClick = {props.onClick} expanded = {props.expanded} className = {props.className}>
        <ExpanderWing/>
        <ExpanderPoint/>
        <span><CaretIcon dims = {caretDims} fill = {theme.white}/></span>
    </ExpanderWrapper>    
};

export default Expander;