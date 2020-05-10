import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

const StyledBackdrop = styled.div`
    visibility: ${props => props.show? 'visible' : 'hidden'};
    position: fixed;    
    z-index: 300;
    top: 0;
    left: 10%;
    right: 10%;    
    background-color: ${props => props.show ? 'rgba(0,0,0,0.5)' : 'transparent'};
    width: 80vw;    
    height: 100vh;  
    transition: background-color 250ms linear;

    overflow-y: scroll;
    overflow-x: hidden;      
    &::-webkit-scrollbar {
        display: none;
    }            
    scrollbar-width: none;
    -ms-overflow-style: none;

    @media screen and (max-width: 706px){
        width: 100vw;
        left: 0;
        right: 0;
    }
`;

class Backdrop extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        const node = document.getElementById('modal-root');
        this.setState({documentLoaded:node});
    }

    handleClickOutside(){
        this.props.onClick(false);
    }

    render() {
      return this.state.documentLoaded ? ReactDOM.createPortal(        
        <StyledBackdrop show={this.props.show}>          
            {this.props.children}          
        </StyledBackdrop>,
        this.state.documentLoaded        
      )
        :
        null
    }
  }

export default onClickOutside(Backdrop);