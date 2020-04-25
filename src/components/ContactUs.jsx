import React from 'react';
import styled from 'styled-components';
import XIcon from './svgs/XIcon.jsx';

const ContactContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    max-width: 600px;
    margin: 140px auto 0;
    padding: 24px;
    color: ${props => props.theme.white};
    background-color: #313232;    

    svg{
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        &:hover{
            fill: ${props => props.theme.hoverRed}
        }        
    }

    h2{
        margin: 0;
        text-align: center;
    }

    p{
        margin: 12px 0 0;
        text-align: center;      
    }

    textarea{
        margin-top: 40px;
        height: 120px;
        padding: 8px 12px;
        background-color: ${props => props.theme.navBarPrimary};
        font-size: 14px;
        font-weight: 550;
        color: ${props => props.theme.black};        
        resize: none;
        border: none;
        box-sizing: border-box;

        &::placeholder {
            color: ${props => props.theme.black};
        }

        &:hover { 
            outline: solid 2px ${props => props.theme.hoverRed};                     
        }

        &:focus { 
            outline: solid 2px ${props => props.theme.hoverRed};
            outline-offset: unset;
        }
    }

    button{                
        margin: 12px 0;
        padding: 6px 10px;                
        background-color: ${props => props.theme.hoverRed};
        font-weight: 550;        
        color: ${props => props.theme.lightGrey};
        width: 80px;
        height: 32px;
        align-self: center;
        border: solid 1px ${props => props.theme.white};
        cursor: pointer;

        &:hover{
            background-color: ${props => props.theme.lightGrey};
            color: ${props => props.theme.hoverRed};
            border-color: ${props => props.theme.hoverRed};
        }     

        &:focus { 
            outline: none;                      
        }           
    }

    @media screen and (max-width: 480px){
        padding: 20px;
        h2{
            font-size: 20px;            
        }
        p{
            font-size: 14px;
        }
    }
`;

const InputFocusUnderline = styled.div`
    position: relative;

    input{
        margin-top: 20px;
        width: 100%;
        background-color: transparent;
        font-size: 14px;
        color: ${props => props.theme.white};
        border-top: none;
        border-right: none;
        border-left: none;
        border-bottom: 1px solid ${props => props.theme.white};    

        &::placeholder {
            color: ${props => props.theme.white};
        }

        &:focus { 
            outline: none;            
            & ~ span{
                width: 100%;                
                border: 1px solid ${props => props.theme.hoverRed};       
            }               
        }

        & ~ span{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            transition: width 0.3s linear;
        }
    }    
`;

const ContactUs = (props) => {
    return(
        <ContactContainer>
            <XIcon onClick = {() => props.close(false)}/>
            <h2>We Want to Hear From You!</h2>
            <p>Send us a message and let's connect</p>
            <InputFocusUnderline>
                <input type='text' placeholder = 'Name'></input><span/>            
            </InputFocusUnderline>
            <InputFocusUnderline>
                <input type='text' placeholder = 'E-Mail'></input><span/>
            </InputFocusUnderline>
            <textarea type='text' placeholder = 'Message'></textarea>
            <button>Submit</button>
        </ContactContainer>
    );
};

export default ContactUs;