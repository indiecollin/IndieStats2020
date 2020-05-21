import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import TipIcon from './svgs/TipIcon.jsx';

const tooltip = '#252839';

const Wrapper = styled.span`    
    display: flex;                        
    justify-content: center; 
    align-items: center;                   
    position: absolute;
    top: -3px;
    right: 8px;
    width: 24px;
    height: 24px;
    box-sizing: content-box;
    z-index: 1000;    
    cursor: pointer;
        
    &:hover p{
        display: block;
        opacity: 1;
    }    

    span{
        height: 16px;
    }

    p{
        display: none;                                                                        
        opacity: 0;
        text-align: center;
        background-color: ${props => props.theme.black};
        color: ${props => props.theme.white};
        padding: 8px 16.5px;
        border-radius: 3px;
        height: auto;
        width: 136px;                        
        position: absolute;
        top: -76px;  
        font-size: 12px;                  
        z-index: 1000;      
        
        &:after {
            content: '';
            position: absolute;
            border-width: 5px;
            border-style: solid;
            top: 100%;
            left: calc(50% - 5px);//relative to border width
            border-color: ${tooltip} transparent transparent transparent;
        }
    }
`;

const Tooltip = (props) => {
    return(
        <Wrapper className = {props.className}>
            <span><TipIcon fill = {theme.black}/></span>
            <p>{props.children}</p>
        </Wrapper>
    );
};

export default Tooltip;