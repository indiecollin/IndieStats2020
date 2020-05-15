import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "16px"};
    height: ${props => props.dims ? props.dims + 'px' : "16px"};
    fill: ${props => props.fill || "#888"};
`;

const ArrowIcon = (props) => {    
    return (
        <SVG viewBox="0 0 410 410" >
            <path d="M405 205L247.7 43.5h-73.684l.009 66.094 39.927.006 56.423 57.931-188.462-.008L5 242.451h265.366l-56.423 57.931-39.927.034V366.5H247.7z"></path>
        </SVG>    
    )
}

export default ArrowIcon;