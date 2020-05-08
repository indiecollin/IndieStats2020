import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

const StyledBackdrop = styled.div`
    visibility: ${props => props.show? 'visible' : 'hidden'};
    position: fixed;    
    z-index: 300;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.show ? 'rgba(0,0,0,0.5)' : 'transparent'};
    width: 75vw;    
    height: 100vh;  
    transition: background-color 250ms linear;
    @media screen and (max-width: 480px){
        min-width: 320px;
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