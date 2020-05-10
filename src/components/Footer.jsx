import React from 'react';
import styled from 'styled-components';

const background = '#313232';

const StyledFooter = styled.footer`
    background-color: ${background};
    display: flex;
    align-items: center;
    position: relative;
    bottom: 0;    
    height: 32px;    
    z-index: 250;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 60px;
    color: ${props => props.theme.lightGrey};

    span{        
        font-size: 12px;
        font-weight: 550;
    }
    
    a{        
        background-color: transparent;
        border: solid 1px ${props => props.theme.white};
        outline: none;
        padding: 6px 10px;
        margin-right: 8px;
        cursor: pointer;
        color: ${props => props.theme.lightGrey};
        font-size: 12px;
        text-decoration: none;

        &:hover{
            color: ${props => props.theme.hoverRed};
            border-color: ${props => props.theme.hoverRed};
        }
    }

    @media screen and (max-width: 480px) {        
        padding: 8px 12px;
    }
`;

const Footer = (props) => {
    return(
        <StyledFooter>
            <span>© 2020 indieStats</span>
            <a href="mailto:collinalexcain@gmail.com">Contact Us</a>            
        </StyledFooter>
    )    
}

export default Footer;