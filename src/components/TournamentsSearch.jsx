import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import styles from '../styles/datepicker.css';
import SearchIcon from './svgs/SearchIcon.jsx';
import Tooltip from './Tooltip.jsx';

const dateRangeHighlight = '#E6E6E6';

const HubWrapper = styled.div`    
    width: 256px;        
    position: absolute;
    left: 75%;    
    top: 100px;        
    height: 790px;//derived from grid height

     @media screen and (max-width: 1300px) { 
        display: none;  
    }     
`;

const SearchHub = styled.div`    
    position: sticky;
    top: 100px;        
    background-color: ${props => props.theme.tourneyColor};
    z-index: 100;
    
    padding-top: 20px;

    &>*{
        margin-bottom: 16px;
    }            
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
        background-color: ${dateRangeHighlight};
        border: none;
        outline: none;
    }

    div>span:hover svg{
        fill: ${dateRangeHighlight};
    }
`;

const Icon = styled.span`                                               
    svg{                
        fill: ${props => props.theme.black};                
        position: absolute;     
        margin: auto;                    
        top: 2px;
        right: 2px;
    }            
`;

const DateRange = styled.div`
    display: flex;
    justify-content: space-around;
    padding-bottom: 2px;   

    :first-child{left: 0;}//start date

    :last-child{right: 0;}//end date
    
    .react-date-picker{
        position: static !important;
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
                    color: ${props => props.theme.trueBlack};                    
                    &:focus{
                        outline: 1px solid ${dateRangeHighlight}7f;
                    }       
                    &::selection {
                        background: ${props => props.theme.trueBlack};
                        color: ${props => props.theme.white};
                    }             
                }                
            }

            button {
                padding: 2px 4px;
                outline: none;
                svg{
                    width: 16px;                        
                }
                &:hover svg{
                    stroke: ${dateRangeHighlight};
                }                

                &:focus svg{
                    stroke: ${dateRangeHighlight};                    
                }
            }

            &:hover{
                border-color: ${dateRangeHighlight};
            }
        }
        .react-date-picker__calendar{  
            left: -32px !important;            
            width: 320px !important;            
            color: ${props => props.theme.white};

            .react-calendar{
                width: 320px;
                background-color: ${props => props.theme.black};                

                .react-calendar__navigation{
                    height: 24px;
                    margin-top: 4px;
                    margin-bottom: unset;
                    
                    button{                        
                        min-width: 36px;
                        color: ${props => props.theme.white};

                        &:focus{
                            background-color: ${props => props.theme.black};
                        }

                        &:hover{
                            background-color: ${props => props.theme.tourneyColor};
                            color: ${props => props.theme.trueBlack};                        
                        }                        
                    }

                    .react-calendar__navigation__label{
                        pointer-events: none;
                        background-color: ${props => props.theme.tourneyColor};                        
                        font-size: 20px;
                        font-weight: 550;
                        text-shadow: ${props => '1px -2px 0 ' + props.theme.black + ' , -2px -2px 0 ' + props.theme.black + ' , -2px 2px 0 ' + props.theme.black + ' , 2px 2px 0 ' + props.theme.black};
                        margin: 0 40px;
                    }
                    .react-calendar__navigation__prev2-button, .react-calendar__navigation__next2-button{
                        display: none;
                    }
                    .react-calendar__navigation__prev-button{
                        margin-left: 4px;
                    }

                    .react-calendar__navigation__next-button{
                        margin-right: 4px;
                    }
                }

                .react-calendar__month-view__weekdays{
                    border-bottom: 2px solid ${props => props.theme.trueBlack};
                    abbr{
                        text-decoration: none;
                    }
                }
                
                .react-calendar__month-view__days__day{
                    color: ${props => props.theme.white};
                    border-bottom: 2px solid ${props => props.theme.trueBlack};
                }

                .react-calendar__month-view__days__day--neighboringMonth{
                    color: ${props => props.theme.tourneyColor};
                    font-weight: 550;
                }

                .react-calendar__tile{
                    padding: 8px 0;
                }

                .react-calendar__tile--now{
                    outline: 1px solid ${props => props.theme.white};
                }

                .react-calendar__tile:enabled:hover{
                    outline: 1px solid ${props => props.theme.white};
                    background-color: ${props => props.theme.hoverRed};
                    color: white;
                }

                .react-calendar__tile--active {
                    outline: 1px solid ${props => props.theme.trueBlack};
                    background-color: ${props => props.theme.tourneyColor};
                    color: white;
                }
            }
            
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
                <DatePicker locale = 'en-US' value = {new Date()} />
                <DatePicker />
            </DateRange>
        </SearchHub>
    </HubWrapper>
};

export default TournamentsSearch;