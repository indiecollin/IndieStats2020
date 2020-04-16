import React from 'react';
import styled from 'styled-components';

import PlayerList from '../components/PlayerList.jsx';
import HubCard from '../components/HubCard.jsx';
import Expander from '../components/Expander.jsx';
import PlayerDetailsStats from '../components/PlayerDetailsStats.jsx';
import PlayerDetailsTournaments from '../components/PlayerDetailsTournaments.jsx';
import PlayerDetailsRivals from '../components/PlayerDetailsRivals.jsx';

const powerRanks = [
    {gamerTag:"VoiD", powerRank: 1, setWins: 0, setLosses: 0},
    {gamerTag:"Nicko", powerRank: 2, setWins: 0, setLosses: 0},
    {gamerTag:"ImHip", powerRank: 3, setWins: 0, setLosses: 0},
    {gamerTag:"Eon", powerRank: 4, setWins: 0, setLosses: 0},
    {gamerTag:"Larry Lurr", powerRank: 5, setWins: 0, setLosses: 0},
    {gamerTag:"Zenyou", powerRank: 6, setWins: 0, setLosses: 0},
    {gamerTag:"Razo", powerRank: 7, setWins: 0, setLosses: 0},
    {gamerTag:"Charliedaking", powerRank: 8, setWins: 0, setLosses: 0},
    {gamerTag:"K9sbruce", powerRank: 9, setWins: 0, setLosses: 0},
    {gamerTag:"Elegant", powerRank: 10, setWins: 0, setLosses: 0},
    {gamerTag:"Cookieslayer", powerRank: 11, setWins: 0, setLosses: 0},
    {gamerTag:"Rex", powerRank: 12, setWins: 0, setLosses: 0},
    {gamerTag:"Ki", powerRank: 13, setWins: 0, setLosses: 0},
    {gamerTag:"Armando", powerRank: 14, setWins: 0, setLosses: 0},
    {gamerTag:"MastaMario", powerRank: 15, setWins: 0, setLosses: 0},
    {gamerTag:"Cyro", powerRank: 16, setWins: 0, setLosses: 0},
    {gamerTag:"Jonny Westside", powerRank: 17, setWins: 0, setLosses: 0},
    {gamerTag:"SweetT", powerRank: 18, setWins: 0, setLosses: 0},
    {gamerTag:"Nitro", powerRank: 19, setWins: 0, setLosses: 0},
    {gamerTag:"Slither2Hunter", powerRank: 20, setWins: 0, setLosses: 0}    
];

const players = [
    {
      "gamerTag": "_LokiandThor_",
      "gameLosses": 23,
      "gameWins": 1,
      "setLosses": 12,
      "setWins": 1
    },
    {
      "gamerTag": "Ace_of_Spades",
      "gameLosses": 4,
      "gameWins": 0,
      "setLosses": 2,
      "setWins": 0
    },
    {
      "gamerTag": "Alexis",
      "gameLosses": 8,
      "gameWins": 3,
      "setLosses": 4,
      "setWins": 0
    },
    {
      "gamerTag": "Arrow",
      "gameLosses": 17,
      "gameWins": 22,
      "setLosses": 6,
      "setWins": 9
    },
    {
      "gamerTag": "Azzy",
      "gameLosses": 4,
      "gameWins": 0,
      "setLosses": 2,
      "setWins": 0
    },
    {
      "gamerTag": "Bluco",
      "gameLosses": 0,
      "gameWins": -2,
      "setLosses": 2,
      "setWins": 0
    },
    {
      "gamerTag": "BoomShakaLarka",
      "gameLosses": 10,
      "gameWins": 15,
      "setLosses": 4,
      "setWins": 7
    },
    {
      "gamerTag": "Candy",
      "gameLosses": 35,
      "gameWins": 55,
      "setLosses": 14,
      "setWins": 24
    },
    {
      "gamerTag": "Chazo",
      "gameLosses": 13,
      "gameWins": 33,
      "setLosses": 6,
      "setWins": 14
    },
    {
      "gamerTag": "Chrono",
      "gameLosses": 6,
      "gameWins": 4,
      "setLosses": 2,
      "setWins": 2
    },
    {
      "gamerTag": "Cookieslayer",
      "mains": "young_link3",
      "setLosses": 2,
      "setWins": 0
    },
    {
      "gamerTag": "Czes",
      "gameLosses": 4,
      "gameWins": 0,
      "setLosses": 2,
      "setWins": 0
    },
    {
      "gamerTag": "Deao",
      "gameLosses": 4,
      "gameWins": 2,
      "setLosses": 2,
      "setWins": 1
    },
    {
      "gamerTag": "Distraction",
      "gameLosses": 4,
      "gameWins": 4,
      "setLosses": 2,
      "setWins": 2
    },
    {
      "gamerTag": "Drago",
      "gameLosses": 5,
      "gameWins": 4,
      "setLosses": 2,
      "setWins": 2
    },
    {
      "gamerTag": "Elegant",
      "gameLosses": 19,
      "gameWins": 35,
      "setLosses": 6,
      "setWins": 14,
      "mains": "luigi7",
      "sponsor": null,
      "powerRank": 10
    },
    {
      "gamerTag": "F0ggy",
      "gameLosses": 12,
      "gameWins": 7,
      "setLosses": 6,
      "setWins": 3
    },
    {
      "gamerTag": "Fonzie",
      "gameLosses": 11,
      "gameWins": 18,
      "setLosses": 4,
      "setWins": 8
    },
    {
      "gamerTag": "FubarZEE",
      "gameLosses": 3,
      "gameWins": 2,
      "setLosses": 2,
      "setWins": 2
    },
    {
      "gamerTag": "Gohan",
      "gameLosses": 34,
      "gameWins": 40,
      "setLosses": 14,
      "setWins": 18
    },
    {
      "gamerTag": "hawk-chan",
      "gameLosses": 4,
      "gameWins": 3,
      "setLosses": 2,
      "setWins": 1
    },
    {
      "gamerTag": "HotDish",
      "gameLosses": 4,
      "gameWins": 0,
      "setLosses": 2,
      "setWins": 0
    },
    {
      "gamerTag": "ImHip",
      "gameLosses": 24,
      "gameWins": 63,
      "setLosses": 5,
      "setWins": 25,
      "mains": "olimar2,duck_hunt1,inkling3",
      "sponsor": null,
      "powerRank": 3
    },
    {
      "gamerTag": "Jason",
      "gameLosses": 11,
      "gameWins": 4,
      "setLosses": 6,
      "setWins": 2
    },
    {
      "gamerTag": "Jimmy",
      "gameLosses": 8,
      "gameWins": 10,
      "setLosses": 4,
      "setWins": 4
    }
];

const playerInfo = {
  gamerTag: 'indie',
  main: 'incineroar1'
}

const statsPreview = [
  <React.Fragment><span>Set Record</span><span>3 - 4</span></React.Fragment>,
  <React.Fragment><span>Game Record</span><span>7 - 8</span></React.Fragment>
];

const tournamentsPreview = [
  'MSM 100',
  'MSM 101',
  'MSM 103',
  'MSM 104',
  'MSM 107'
];

const rivalsPreview = [
  <span>Lin</span>,
  <span>Assmilk</span>,
  <span>Drew</span>,
  <span>Bleh</span>,
  <span>SomeGuy</span>
];

const rivals = [
    {gamerTag:'Lin', wins: 1},
    {gamerTag:'Assmilk', wins: 5},
    {gamerTag:'Drew', wins: 3},
    {gamerTag:'Bleh', wins: 11},
    {gamerTag:'SomeGuy', wins: 0} 
];

const playerStats = {
    setWins: 3,
    setLosses: 4,
    gameWins: 6,
    gameLosses: 9,
    avgPlacement: '65th',
    avgSeed: 101,
    tournamentsAttended: 2,
    mostLosses: 'Lin'
};

const playerTournaments = [
    {
      "name": "Mega Smash Mondays 182",
      "shortName": "MSM 182",
      "top3": [
        "Nicko",
        "Eon",
        "Charliedaking"
      ],
      "placement": '65th',
      "seed": 75,
      "wins": 1,
      "losses": 2,
      "loser": "AJsuxx",
      "eliminator": "GaYo"
    },
    {
      "name": "Mega Smash Mondays 183",
      "shortName": "MSM 183",
      "top3": [
        "VoiD",
        "ImHip",
        "Larry Lurr"
      ],
      "placement": '65th',
      "seed": 127,
      "wins": 2,
      "losses": 2,
      "loser": "ImHip",
      "eliminator": "MChan"
    },
    {
        "name": "Mega Smash Mondays 182",
        "shortName": "MSM 182",
        "top3": [
          "Nicko",
          "Eon",
          "Charliedaking"
        ],
        "placement": '65th',
        "seed": 75,
        "wins": 1,
        "losses": 2,
        "loser": "AJsuxx",
        "eliminator": "GaYo"
      },
      {
        "name": "Mega Smash Mondays 183",
        "shortName": "MSM 183",
        "top3": [
          "VoiD",
          "ImHip",
          "Larry Lurr"
        ],
        "placement": '65th',
        "seed": 127,
        "wins": 2,
        "losses": 2,
        "loser": "ImHip",
        "eliminator": "MChan"
      },
      {
        "name": "Mega Smash Mondays 182",
        "shortName": "MSM 182",
        "top3": [
          "Nicko",
          "Eon",
          "Charliedaking"
        ],
        "placement": '65th',
        "seed": 75,
        "wins": 1,
        "losses": 2,
        "loser": "AJsuxx",
        "eliminator": "GaYo"
      }
  ];

const rival = {
  gamerTag:  'Lin',
  main: 'default',
  setWins: 1,
  setLosses: 6,
  gameWins: 7,
  gameLosses: 15,
  highestTournament: "MSM 172",
  highestPlacement: '1st',
  lastMet:"MSM 180"
};

const player = {
  gamerTag: 'indie',
  main: 'incineroar1'  
};

const matchHistory = [
    {
      tournamentName: "Mega Smash Mondays 169",      
      title: 'Winners Round 2',
      win: true,
      playerScore: 2,
      rivalScore: 1 
    },
    {
      tournamentName: "Mega Smash Mondays 170",      
      title: 'Winners Round 4',
      win: false,
      playerScore: 0,
      rivalScore: 2 
    },
    {
      tournamentName: "Mega Smash Mondays 172",      
      title: 'Grand Finals',
      win: false,
      playerScore: 2,
      rivalScore: 3 
    },
    {
      tournamentName: "Mega Smash Mondays 175",      
      title: 'Losers Round 6',
      win: false,
      playerScore: 0,
      rivalScore: 2 
    },
    {
      tournamentName: "Mega Smash Mondays 177",      
      title: 'Winners Round 3',
      win: false,
      playerScore: 1,
      rivalScore: 2 
    },
    {
      tournamentName: "Mega Smash Mondays 178",      
      title: 'Losers Finals',
      win: false,
      playerScore: 1,
      rivalScore: 3 
    },
    {
      tournamentName: "Mega Smash Mondays 180",      
      title: 'Losers Round 5',
      win: false,
      playerScore: 1,
      rivalScore: 2 
    },
];

const PlayersContainer = styled.main`    
    min-height: 100vh;    
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    //margin-bottom: 50px;

    @media screen and (max-width: 706px) {        
      flex-flow: column;
    }
`;

const PlayerInfo = styled.div`
  display: grid;
  //grid-template-columns: 320px minmax(0, 0.5fr) repeat(auto-fit, 300px);
  //grid-template-columns: 400px repeat(3, minmax(320px, 0.8fr)) minmax(0, 0.4fr);
  grid-template-columns: minmax(0, 1.05fr) repeat(3, minmax(320px, 0.8fr));
  
  row-gap: 20px;
  flex-wrap: wrap;
  justify-items: center;  
  position: relative;
  margin: 90px auto auto auto;
  //transition: max-height 0.5s linear;

  &>div:last-child{
    grid-column: 2;
    display: none;
  }

  @media screen and (max-width: 1320px) {
    grid-template-columns: 1fr;
    margin-left: 40px;
    display: flex;
    flex-direction: column;

    &>div:last-child{
      display: block;
    }
  }

  @media screen and (max-width: 706px) {
    margin-left: auto;
  }
`;

const PlayerDetails = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) repeat(3, minmax(320px, 0.8fr));
  min-width: 500px;
  margin: 20px auto;

  @media screen and (max-width: 1320px) {
    grid-template-columns: 1fr;
    flex-basis: 100%;
  }

  @media screen and (max-width: 500px) {
    min-width: unset;
    margin: 20px 0;
  }
`;

const Players = (props) => (
    <PlayersContainer>
        <PlayerList players = {players} powerRanks = {powerRanks}/>
        <PlayerInfo>
          <HubCard type = 'player' player = {playerInfo} gridColumn = '3 / 4'/>
          <HubCard type = 'stats' preview = {statsPreview} gridColumn = '2 / 3'/>
          <HubCard type = 'tournaments' preview = {tournamentsPreview} gridColumn = '3 / 4'/>
          <HubCard type = 'rivals' preview = {rivalsPreview} gridColumn = '4 / 5'/>
          <Expander expanded = {true}/>         
        </PlayerInfo>
        <PlayerDetails>
          {/* <PlayerDetailsStats stats = {playerStats}/> */}
          {/* <PlayerDetailsTournaments tournaments = {playerTournaments} page = {1}/> */}
          <PlayerDetailsRivals player = {player} rival = {rival} rivals = {rivals} matchHistory = {matchHistory}/>
        </PlayerDetails>        
    </PlayersContainer>
  );

export default Players;