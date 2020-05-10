import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import XIcon from './svgs/XIcon.jsx';
import Players from '../../public/assets/about.jpg';
import Creator from '../../public/assets/collin.jpg';

const StyledModal = styled.div`    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;          
    padding-top: 40px;      

    svg{
        position: fixed;
        top: 32px;
        right: 12%;
        z-index: 10; 
        cursor: pointer;
        height: 20px;
        width: 20px;

        &:hover {
            fill: ${props => props.theme.hoverRed};
        }    
    }            

    &>div{        
        padding: 24px;        
        color: ${props => props.theme.white};
        display: flex;
        max-width: 1072px;        

        img:first-child, div:first-child{ 
            margin-right: 12px;
        }

        &>div{
            display: flex;
            flex-direction: column;
            max-width: 50%;
            padding: 24px;
            background-color: ${props => props.theme.black};
            border-radius: 5px;

            h3{
                margin-bottom: 16px;
            }
        }

        img{
            max-width: 500px;            
            max-height: 333px;
            width: 50%;
            height: 33.3%;
        }
    }


    div:last-child{        
        img{
            margin-top: auto;
        }
    }

    @media screen and (max-width: 960px){        
        &>div{
            flex-direction: column;
            align-items: center;
            &>div{
                max-width: 90%;
            }
            div:first-child{ 
                margin: 0;
            }
            img, img:first-child{
                margin: 8px auto;
                width: 66.6%;
                height: 44.4%;
            }
        }
    }        

    @media screen and (max-width: 706px){
        margin: 0;        
        padding-bottom: 20px;

        svg{
            right: 3%;
        }
        &>div{        
            padding: 0 12px;
            &>div{
                padding: 16px;                
            }
            img, img:first-child{
                width: 90%;
                height: 60%;
            }
        }        
    }
`;

const Modal = (props) => {    
    return <StyledModal>        
        <XIcon onClick = {() => props.closeModal(false)} fill={theme.darkGrey}/>
        <div>
            <div>
                <h3>Analytics For All</h3>
                <p>indieStats.gg is a web application used to assist players with tracking their growth and progress in the SoCal smash scene. All of this data has always been available, but it was only ever consolidated at the end of every season by very dedicated inviduals to determine power ranked players. With indieStats.gg, now any player can be in the know!</p>
            </div>
            <img src = {Players}/>            
        </div>
        <div>
            <img src = {Creator}/>
            <div>
                <h3>indieStats.gg's Creator</h3>
                <p>This app was developed by fellow Smasher, Collin "indie" Cain (formerly Mode), as a passion project to improve visualization of all the data being collected in brackets by the Smash community. As a new low level player himself Collin wanted to create something that everyone in the community could use and with that vision and a lot of hard work indieStats.gg was born!</p>
            </div>
        </div>
    </StyledModal>
};

export default Modal;