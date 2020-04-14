import React from 'react';
import styled from 'styled-components';

const textStroke = '#226377';

const Options = styled.div`    
    display: flex;        
    background-color: ${props => props.theme.white}; 
    position: relative;
    z-index: 10;
    border-radius: 10px;
    background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ' 0 2px, ' + props.theme.stripeBlack + ' 2px 4px'});  
    border-bottom: solid 0.2px ${props => props.theme.stripeGrey}; 
    width: 75%;//temp
    margin: 0 auto;// 4px;
    min-height: 30px;    

    button:first-child{ 
        clip-path: polygon(0% 0%, 0% 100%, 85% 100%, 95% 0%);
        z-index: 20;        
    }     

    button:last-child{                    
        clip-path: polygon(15% 0%, 5% 100%, 100% 100%, 100% 0%);        
    }               
`;

const OptionsButton = styled.button`
    border: 1.5px solid ${props => props.theme.stripeGrey};
    border-radius: 10px;
    -webkit-text-stroke: ${() => textStroke} 0.5px;
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
`;


const OptionSwitch = (props) => {
    return(
        <Options>
            <OptionsButton selected = {!props.selected} background = {props.background}>{props.left}</OptionsButton>
            <OptionsButton selected = {props.selected} background = {props.background}>{props.right}</OptionsButton>
        </Options>
    );
};

export default OptionSwitch;