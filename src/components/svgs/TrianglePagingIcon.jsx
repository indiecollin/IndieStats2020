import React, { Component } from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "16px"};
    height: ${props => props.dims ? props.dims + 'px' : "16px"};
    fill: ${props => props.fill || "#888"};
    stroke: ${props => props.stroke || "#888"};
`;

 export default class TrianglePagingIcon extends Component{
    render(){
        return (                                                
            <SVG viewBox="0 0 32 32" fill = {this.props.fill} stroke = {this.props.stroke} dims = {this.props.dims} className={this.props.className}>
                <path d="M 2,28 17,15 2,2 Z" transform="translate(0 0)"/>                       
            </SVG>
        );
    };
};