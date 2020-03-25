import React from 'react';
// import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledModal = styled.div`
    position: fixed;
    top: 0;bottom: 0;left: 0;right: 0;
    display: grid;
    justify-content: center;
    align-items: center;    
    z-index: 300;        
    background: rgba(0,0,0,0.8);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin: 0 80px;   
    overflow: scroll;
    overflow-x: hidden;      

    &::-webkit-scrollbar {
        display: none;
    }


    button{        
        position: fixed;
        top: 20px;
        right: 120px;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        background-image: radial-gradient(${props => props.theme.lightGrey + ', ' + props.theme.grey});
        border: 0;        
        z-index: 10; 
        cursor: pointer;
        transition: all .2s;        

        &:hover{
            transform: scale(1.15);            
        }

        span{
            height: 2px;
            width: 32px;
            background-color: ${props => props.theme.darkGrey};
            display: inline-block;
            position: absolute;
            left: 8px;

            &:first-child{
            transform: rotate(45deg);
            }

            &:last-child{
                transform: rotate(-45deg);
            }
        }                
    }

    div{
        padding: 40px;        
        border-radius: 2px;
        display: inline-block;
        max-height: 100vh;
        margin: 1rem;
        position: relative;
        min-width: 300px;        
        justify-self: center;
        color: ${props => props.theme.white};
    }

    /* @media screen and (max-width: 706px){
        margin: 0 16px;   

        button{  
            right: 40px;
         }
    } */
`;

const modalRoot = document.getElementById('modal-root');

const Modal = (props) => {
    return ReactDOM.createPortal(
    <StyledModal>
        <button>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
        </button>
        <div>
            {props.children}
        </div>
    </StyledModal>,
    modalRoot
    )
};

// class Modal extends Component {
//     render() {
//       return ReactDOM.createPortal(
//         <StyledModal>
//             <button>
//                 <span>&nbsp;</span>
//                 <span>&nbsp;</span>
//             </button>
//         <div>
//             {this.props.children}
//         </div>
//         </StyledModal>,
//         modalRoot
//       )
//     }
//   };

export default Modal;