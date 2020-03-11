import React from 'react';
import styled from 'styled-components';

import PlayerList from '../components/PlayerList.jsx';

const powerRanks = [
    {gamerTag:"VoiD", setWins: 0, setLosses: 0},
    {gamerTag:"Nicko", setWins: 0, setLosses: 0},
    {gamerTag:"ImHip", setWins: 0, setLosses: 0},
    {gamerTag:"Eon", setWins: 0, setLosses: 0},
    {gamerTag:"Larry Lurr", setWins: 0, setLosses: 0},
    {gamerTag:"Zenyou", setWins: 0, setLosses: 0},
    {gamerTag:"Razo", setWins: 0, setLosses: 0},
    {gamerTag:"Charliedaking", setWins: 0, setLosses: 0},
    {gamerTag:"K9sbruce", setWins: 0, setLosses: 0},
    {gamerTag:"Elegant", setWins: 0, setLosses: 0}
];

const PlayersContainer = styled.main`
    background-color: lightgreen;
    width: 100%;
    height: 100%;
`;

const Players = (props) => (
    <PlayersContainer>
        <PlayerList players = {powerRanks} all = {false}/>
    </PlayersContainer>
  );

export default Players;