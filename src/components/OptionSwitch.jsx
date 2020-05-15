import React from 'react';
import styled from 'styled-components';

const textStroke = '#226377';

const Options = styled.div`    
    display: flex;            
    position: relative;
    z-index: 10;
    border-radius: 10px;    
    border-bottom: solid 0.2px ${props => props.theme.stripeGrey}; 
    width: 75%;//temp
    margin: 0 auto;
    min-height: 30px;        
    button:first-child{
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    button:last-child{                    
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        position: relative;
        &:before{
            display: block;
            position: absolute;
            content:'';
            background: repeating-linear-gradient(${props => 'to right, ' + props.theme.stripeGrey + ', '+ props.theme.stripeGrey + ' 2px, ' + props.theme.stripeBlack + ' 2px, ' + props.theme.stripeBlack + ' 4px'});            
            transform: skew(30deg);
            z-index: 20;
            width: 20%;
            height: calc(100% + 3px);//adjusted for border
            top: -2px;
            left: -12px;
        }        
    }               
`;

const OptionsButton = styled.button`
    border: 1.5px solid ${props => props.theme.stripeGrey};    
    -webkit-text-stroke: ${textStroke} 0.5px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 19px;
    width: 100%;
    background-color: ${props => props.selected ? props.theme.white : props.background};
    outline: none;                        
    position: ${props => props.selected ? 'relative' : 'static'};
    cursor: ${props => props.selected ? 'default' : 'pointer'};

    &:hover{        
        border: 1.5px solid ${props => props.selected ? props.theme.stripeGrey : props.theme.hoverRed};
        background-color: ${props => props.theme.white};
    }

    &:disabled{
        color: ${props => props.theme.black}
    }
`;


const OptionSwitch = (props) => {
    return(
        <Options>
            <OptionsButton onClick = {props.onToggle} selected = {props.selected} background = {props.background} disabled = {props.selected}>{props.left}</OptionsButton>
            <OptionsButton onClick = {props.onToggle} selected = {!props.selected} background = {props.background} disabled = {!props.selected}>{props.right}</OptionsButton>
        </Options>
    );
};

export default OptionSwitch;