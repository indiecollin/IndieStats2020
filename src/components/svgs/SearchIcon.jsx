import React, { Component } from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "16px"};
    height: ${props => props.dims ? props.dims + 'px' : "16px"};
    fill: ${props => props.fill || "#888"};
`;

class SearchIcon extends Component {
    render(){
        return <SVG fill={this.props.fill} dims = {this.props.dims} viewBox="0 0 16 16">        
        <path d="M15.53,16a.46.46,0,0,1-.33-.13l-4.29-4.15a.47.47,0,0,1,.65-.68l4.3,4.15a.48.48,0,0,1,0,.67A.49.49,0,0,1,15.53,16Z" />
        <path d="M6.81,13.5A6.79,6.79,0,0,1,0,6.75a6.82,6.82,0,0,1,13.63,0A6.79,6.79,0,0,1,6.81,13.5ZM6.81.94A5.85,5.85,0,0,0,.94,6.75a5.87,5.87,0,0,0,11.74,0A5.85,5.85,0,0,0,6.81.94Z" transform="translate(0 0)" />
    </SVG>
    }
};

export default SearchIcon;