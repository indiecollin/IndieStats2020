import React, { Component } from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "16px"};
    height: ${props => props.dims ? props.dims + 'px' : "16px"};
    fill: ${props => props.fill || "#888"};
`;

 export default class SmashBallIcon extends Component{
    render(){
        return (                        
            <SVG viewBox="0 0 220 220" fill = {this.props.fill} dims = {this.props.dims} className={this.props.className}>
                <path d=" M 92.0 8.0 C 116.2 4.0 141.7 8.5 162.7 21.3 C 182.5 33.3 198.2 52.0 206.2 73.7 C 212.3 89.6 213.9 107.1 211.8 123.9 C 171.8 124.1 131.9 123.9 92.0 124.0 C 92.0 85.3 91.9 46.7 92.0 8.0 Z" />
                <path d=" M 9.6 84.4 C 14.7 63.7 26.7 44.9 42.9 31.0 C 43.2 62.0 42.9 93.0 43.0 124.0 C 31.1 123.9 19.2 124.2 7.3 123.9 C 5.9 110.7 6.2 97.3 9.6 84.4 Z" />
                <path d=" M 12.6 144.0 C 22.7 144.0 32.9 144.0 43.0 144.0 C 43.0 158.7 43.1 173.4 43.0 188.2 C 29.1 176.6 18.2 161.2 12.6 144.0 Z" />
                <path d=" M 92.0 144.0 C 130.3 144.0 168.6 143.9 206.8 144.1 C 197.8 169.4 178.6 190.9 154.4 202.5 C 135.2 211.8 113.0 215.0 92.0 211.2 C 91.9 188.8 92.0 166.4 92.0 144.0 Z" />
            </SVG>
        );
    };
};