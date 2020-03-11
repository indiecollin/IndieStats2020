import React, { Component } from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "16px"};
    height: ${props => props.dims ? props.dims + 'px' : "16px"};
    fill: ${props => props.fill || "#888"};
`;

 export default class BracketIcon extends Component{
    render(){
        return (                                    
            <SVG viewBox="0 0 90 90" fill = {this.props.fill} dims = {this.props.dims} className={this.props.className}>
                <path d="M84.448 59.891H72.435V42.609a3.66 3.66 0 0 0-3.635-3.685H49.406V28.276H60.2v-19l-6.9 8.858L45 6l-8.3 12.138-6.9-8.858v19h10.8v10.644H21.2a3.66 3.66 0 0 0-3.634 3.685v17.955H5.552A3.578 3.578 0 0 0 2 64.167V80.4a3.553 3.553 0 1 0 7.105 0V67.77h24.189V80.4a3.553 3.553 0 1 0 7.105 0V64.167a3.578 3.578 0 0 0-3.553-3.6H24.834V46.3h40.332v13.6H53.153a3.578 3.578 0 0 0-3.553 3.6v16.23a3.553 3.553 0 1 0 7.105 0V67.1h24.19v12.624a3.553 3.553 0 1 0 7.105 0v-16.23a3.578 3.578 0 0 0-3.552-3.603z"/>
            </SVG>
        );
    };
};