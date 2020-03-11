import React, {Component} from 'react';
import styled from 'styled-components';

import XIcon from './svgs/XIcon.jsx';

const StyledClearX = styled.button`
    position: absolute;
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    width: ${props => props.dims ?  props.dims + 'px' : '16px'};
    height: ${props => props.dims ? props.dims + 'px' : '16px'};
    top: ${props => props.position.top};
    right: ${props => props.position.right};
    background: transparent;
    border: none;
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
            <StyledClearX dims = {this.props.dims} visible = {this.props.visible} position = {this.props.position}>
                <XIcon dims = {this.props.dims}></XIcon>
            </StyledClearX>
        );
    };
}

export default ClearX;