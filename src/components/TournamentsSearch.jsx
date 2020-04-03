import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import DatePicker from 'react-date-picker';
import SearchIcon from './svgs/SearchIcon.jsx';
import Tooltip from './Tooltip.jsx';

const background = '#AC3C3C';

const HubWrapper = styled.div`    
    width: 256px;        
    position: absolute;
    left: 75%;    
    top: 120px;        
    height: 752px;//derived from grid height

    /* @media screen and (max-width: 1300px) { 
        display: none;         
    }     

    .side-panel{
        .search-tournaments{
            display: block;
        }
    } */
`;

const SearchHub = styled.div`    
    position: sticky;
    top: 110px;        
    background-color: ${() => background};
    
    padding-top: 20px;

    &>*{
        margin-bottom: 16px;
    }
        
    /* .tournament-search, .player-search{
        width: 95%;
    } */
`;

const SearchBar = styled.div`    
    display: flex;
    position: relative;

    input{
        width: 200px;
        margin-left: 20px;
    }    
    
    button{
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        right: 14px;
    }
`;

const Icon = styled.span`    
    line-height: 26px;                                              
    svg{                
        fill: ${props => props.theme.black};                
        position: absolute;     
        margin: auto;                    
        top: 0;
        right: 0;
    }            
`;

const DateRange = styled.div`
    display: flex;
    justify-content: space-around;     

    :first-child{left: 0;}//start date

    :last-child{right: 0;}//end date
    
    .react-date-picker{
        position: static;
        .react-date-picker__wrapper{                    
            min-width: 124px;
            position: static;
            border-color: ${props => props.theme.black};

            .react-date-picker__inputGroup{
                min-width: auto;
                font-size: 12px;
                font-weight: 550;
                justify-content: space-evenly;

                input{
                    color: ${props => props.theme.black};
                }
            }

            button {
                padding: 2px 4px;
                svg{
                    width: 16px;                        
                }
            }
        }
        .react-date-picker__calendar{  
            right: calc(50% - 350px*.5);//350px based on calendar width
            left: unset;
        }
    }
`;

const TournamentsSearch = (props) => {
    return <HubWrapper>
        <SearchHub>
            <SearchBar>
                <input type='text' placeholder='Tournament Search'/>
                <button><Icon><SearchIcon fill = {theme.black}/></Icon></button>
            </SearchBar>
            <SearchBar>
                <input type='text' placeholder='Player Search'/>
                <Tooltip>Multi-player Search: Enter Gamer Tags Separated by Commas</Tooltip>
            </SearchBar>
            <DateRange>
                <DatePicker />
                <DatePicker />
            </DateRange>
        </SearchHub>
    </HubWrapper>
};

export default TournamentsSearch;