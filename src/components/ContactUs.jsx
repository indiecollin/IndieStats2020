import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 420px;
    margin: 120px auto 0;
    color: ${props => props.theme.white};

    h1{
        margin: 0;
        text-align: center;
    }

    p{
        margin: 12px 0 0;        
    }

    input{
        margin-top: 20px;
        background-color: transparent;
        color: ${props => props.theme.white};
        border-top: none;
        border-right: none;
        border-left: none;

        &::placeholder {
            color: ${props => props.theme.white};
        }

        &:focus { 
            outline: none;                   
        }

    }

    textarea{
        margin-top: 40px;
        height: 120px;
        padding: 8px 12px;
        background-color: ${props => props.theme.navBarPrimary};
        color: ${props => props.theme.white};        
        resize: none;

        &::placeholder {
            color: ${props => props.theme.white};
        }

        &:focus { 
            outline: solid 2px ${props => props.theme.hoverRed};
            border: solid 1px ${props => props.theme.hoverRed};            
        }
    }

    button{                
        margin: 12px 0;
        padding: 6px 10px;                
        background-color: ${props => props.theme.navBarPrimary};
        color: ${props => props.theme.lightGrey};
        width: 80px;
        height: 32px;
        align-self: center;
        border: solid 1px ${props => props.theme.white};
        cursor: pointer;

        &:hover{
            color: ${props => props.theme.hoverRed};
            border-color: ${props => props.theme.hoverRed};
        }     

        &:focus { 
            outline: none;                   
        }           
    }
`;

const ContactUs = (props) => {
    return(
        <ContactContainer>
            <h1>Contact Us</h1>
            <p>Yo shoot me a message and we'll see what's up :)</p>
            <input type='text' placeholder = 'Name'></input>
            <input type='text' placeholder = 'E-Mail'></input>
            <textarea type='text' placeholder = 'Message'></textarea>
            <button>Submit</button>
        </ContactContainer>
    );
};

export default ContactUs;