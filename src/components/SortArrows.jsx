import React, {Component} from 'react';
import styled from 'styled-components';

const Sorter = styled.span`
    position: absolute;                                
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    cursor: pointer;        
    ${props => props.position.left ? 'left: ' + props.position.left + ';' : ''}
    ${props => props.position.right ? 'right: ' + props.position.right + ';' : ''}    
`;

const UpSort = styled(Sorter)`    
    border-bottom: 5px solid ${props => props.baseColor};
    top: 30%;
    &:hover{border-bottom: 5px solid ${props => props.hoverColor}};        
`;

const DownSort = styled(Sorter)`        
    border-top: 5px solid ${props => props.baseColor};
    bottom: 30%;
    &:hover{border-top: 5px solid ${props => props.hoverColor}};           
`;

class SortArrows extends Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <React.Fragment>
                <UpSort position = {this.props.position} baseColor = {this.props.baseColor} hoverColor = {this.props.hoverColor}></UpSort>
                <DownSort position = {this.props.position} baseColor = {this.props.baseColor} hoverColor = {this.props.hoverColor}></DownSort>
            </React.Fragment>
        );
    };
};

export default SortArrows;