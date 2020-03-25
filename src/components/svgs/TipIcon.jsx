import React, { Component } from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "16px"};
    height: ${props => props.dims ? props.dims + 'px' : "16px"};
    fill: ${props => props.fill || "#888"};
`;

class TipIcon extends Component {
    render(){
        return <SVG viewBox="0 0 16 16" fill = {this.props.fill} dims = {this.props.dims} className={this.props.className}>
            <path d="M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16ZM8,1.37A6.63,6.63,0,1,0,14.63,8,6.64,6.64,0,0,0,8,1.37Z"/>
            <rect x="7.06" y="7.24" width="1.87" height="4.72" rx="0.56" ry="0.56"/>
            <circle cx="8" cy="4.96" r="0.93"/>
        </SVG>
    }
};

export default TipIcon;