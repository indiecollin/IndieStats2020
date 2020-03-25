import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import TipIcon from './svgs/TipIcon.jsx';

const tooltip = '#252839';

const tipDims = '16';

const Wrapper = styled.div`    
    cursor: pointer;
    position: absolute;
    top: 2px;
    right: 16px;
    display: flex;                        
    justify-content: center;                    
    box-sizing: content-box;
    z-index: 110;            
        
    &:hover p{
        display: block;
        opacity: 1;
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
        z-index: 110;      
        
        &:after {
            content: '';
            position: absolute;
            border-width: 5px;
            border-style: solid;
            top: 100%;
            left: calc(50% - 5px);//relative to border width
            border-color: ${() => tooltip} transparent transparent transparent;
        }
    }
`;

const Tooltip = (props) => {
    return(
        <Wrapper>
            <span><TipIcon fill = {theme.black} dims = {tipDims}/></span>
            <p>{props.children}</p>
        </Wrapper>
    );
};

export default Tooltip;