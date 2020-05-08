import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import XIcon from './svgs/XIcon.jsx';

const StyledModal = styled.div`    
    display: grid;
    justify-content: center;
    align-items: center;        
    margin: 0 80px;   
    overflow: scroll;
    overflow-x: hidden;      

    &::-webkit-scrollbar {
        display: none;
    }            
    scrollbar-width: none;
    -ms-overflow-style: none;

    svg{
        position: fixed;
        top: 32px;
        right: 28px;
        z-index: 10; 
        cursor: pointer;
        height: 20px;
        width: 20px;

        &:hover {
            fill: ${props => props.theme.hoverRed};
        }    
    }            

    div{        
        padding: 24px;
        color: ${props => props.theme.white};
    }
`;

const Modal = (props) => {    
    return <StyledModal>        
        <XIcon onClick = {() => props.closeModal(false)} fill={theme.darkGrey}/>
        <div>
            About Content
        </div>
    </StyledModal>
};

export default Modal;