import React, {Component} from 'react';
import styled from 'styled-components';

import XIcon from './svgs/CircledXIcon.jsx';

const StyledClearX = styled.button`
    display: ${props => props.visible ? 'block' : 'none'};
    position: absolute;
    width: ${props => props.dims ?  props.dims + 'px' : '16px'};
    height: ${props => props.dims ? props.dims + 'px' : '16px'};
    top: ${props => props.position ? props.position.top : 0 };
    right: ${props => props.position ? props.position.right : 0};
    background: transparent;
    border: none;
    outline: none;
    svg{
        position: absolute;     
        margin: auto;            
        cursor: pointer;
        top: -2px;
        right: -2px;
    }
`;

class ClearX extends Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <StyledClearX onClick = {this.props.onClick} dims = {this.props.dims} visible = {this.props.visible} position = {this.props.position} className = {this.props.className}>
                <XIcon dims = {this.props.dims}></XIcon>
            </StyledClearX>
        );
    };
}

export default ClearX;