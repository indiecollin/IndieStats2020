import React, { Component } from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "16px"};
    height: ${props => props.dims ? props.dims + 'px' : "16px"};
    path{
        fill: ${props => props.fill || "#888"};
    }    
`;

 export default class XIcon extends Component{
    render(){
        return (                                                
            <SVG viewBox="0 128 172 172" fill = {this.props.fill} dims = {this.props.dims} className={this.props.className}>
                <path d="m 79.704925,294.65644 c -28.94464,-2.00654 -54.92375,-19.04337 -68.0288,-44.61259 -4.7927505,-9.3511 -7.4776905,-18.26199 -8.8399505,-29.33836 -0.4819,-3.91825 -0.40449,-14.33832 0.13759,-18.52083 2.38496,-18.40155 10.0346005,-34.50216 22.5807705,-47.52693 12.94313,-13.43689 30.02864,-22.1435 48.491,-24.71056 4.21306,-0.58579 13.83071,-0.80179 18.26062,-0.41011 28.575525,2.52658 53.526735,19.30694 66.628555,44.80949 6.37801,12.41472 9.36456,25.80942 8.9501,40.14123 -0.29348,10.14843 -2.04302,18.78605 -5.65385,27.91354 -4.28648,10.83539 -10.29031,19.91296 -18.72425,28.31042 -13.27178,13.21436 -30.14588,21.38685 -48.575995,23.52641 -4.34685,0.50462 -11.24621,0.69417 -15.22579,0.41829 z m -35.47376,-38.39195 c 0.31785,-0.16062 9.71558,-9.41707 20.88385,-20.56987 l 20.30593,-20.27783 20.439895,20.42206 c 13.87004,13.85793 20.67377,20.47879 21.1675,20.59855 2.03227,0.49297 3.74728,-1.22204 3.25431,-3.25431 -0.11976,-0.49373 -6.74036,-7.2972 -20.59771,-21.16666 L 89.263725,211.57737 109.68494,191.1383 c 13.85735,-13.86946 20.47795,-20.67293 20.59771,-21.16666 0.35286,-1.45468 -0.48009,-2.91714 -1.85851,-3.2631 -0.36751,-0.0922 -0.99561,-0.0883 -1.3958,0.009 -0.49373,0.11977 -7.2972,6.74037 -21.16666,20.59772 l -20.439065,20.42122 -20.43906,-20.42122 c -13.86946,-13.85735 -20.67293,-20.47795 -21.16666,-20.59771 -2.03227,-0.49297 -3.74728,1.22204 -3.25431,3.25431 0.11976,0.49373 6.74062,7.29746 20.59855,21.1675 l 20.42206,20.4399 -20.27783,20.30593 c -11.1528,11.16827 -20.40925,20.566 -20.56987,20.88385 -1.10393,2.18456 1.31111,4.5996 3.49567,3.49567 z"/>        
            </SVG>
        );
    };
};