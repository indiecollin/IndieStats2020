import React, {Component} from 'react';
import styled from 'styled-components';

import CaretIcon from './svgs/CaretIcon.jsx';
import theme from '../styles/Theme';

const caretDims = 12;
const ExpanderWrapper = styled.div`    
    margin-top: 4px;
    height: 16px;
    width: 100%;        
    background: linear-gradient(${props => 'to bottom, ' + props.theme.black + ' 0%, ' + props.theme.black + ' 50%, transparent 50%, transparent 100%'});
    clip-path: polygon(10% 100%, 90% 100%, 100% 0, 0 0);
    cursor: pointer;        
`;

const StyledExpander = styled.div`  
    text-align: center;               
    background-color: ${props => props.theme.black};            
    width: 60%;
    height: 100%;
    margin: 0 auto;            
    clip-path: polygon(30% 100%, 70% 100%, 100% 0, 0 0);

    span{                          
        display: block;      
        ${props => props.expanded ? 'transform: rotate(-180deg);' : ''}       
    }                    
`;

class Expander extends Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <ExpanderWrapper>
                <StyledExpander expanded = {this.props.expanded}>
                    <span><CaretIcon dims = {caretDims} fill = {theme.white}/></span>
                </StyledExpander>
            </ExpanderWrapper>
        );
    };
};

export default Expander;