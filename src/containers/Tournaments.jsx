import React from 'react';
import styled from 'styled-components';
import TournamentsUpcoming from '../components/TournamentsUpcoming.jsx';
import TournamentsList from '../components/TournamentsList.jsx';
import TournamentsSearch from '../components/TournamentsSearch.jsx';
import TournamentsDetails from '../components/TournamentsDetails.jsx';

const tournaments = [
    {    
      "name": "Mega Smash Mondays 132",
      "shortName": "MSM 132",
      "bracketHost": "smash.gg",
      "bracketLink": "https://smash.gg/tournament/mega-smash-mondays-132/events/wii-u-singles/overview",
      "featured": false,
      "eventDate": "2018-02-05T08:00:00.000Z",
      "venue": "Thunder Studios",
      "series": "Mega Smash Mondays",
      "season": "Spring 2019",
      "eventPage": null,
      "entrantCount": 75,
      "topPlacements": [
        {"gamerTag": "falln"},
        {"gamerTag": "Elegant"},
        {"gamerTag": "Charliedaking"}
      ],
      "topSeeds": [
        {"gamerTag": "Elegant"},
        {"gamerTag": "falln"},
        {"gamerTag": "K9sbruce"},
        {"gamerTag": "Charliedaking"},
        {"gamerTag": "Rich Brown"}
      ]
    },
    {
      "name": "Mega Smash Mondays 133",
      "shortName": "MSM 133",
      "bracketHost": "smash.gg",
      "bracketLink": "https://smash.gg/tournament/mega-smash-mondays-133/events/wii-u-singles/overview",
      "featured": false,
      "eventDate": "2018-02-12T08:00:00.000Z",
      "venue": "Thunder Studios",
      "series": "Mega Smash Mondays",
      "season": "Spring 2019",
      "eventPage": null,
      "entrantCount": 76,
      "topPlacements": [
        {"gamerTag": "falln"},
        {"gamerTag": "Nicko"},
        {"gamerTag": "K9sbruce"}
      ],
      "topSeeds": [
        {"gamerTag": "falln"},
        {"gamerTag": "K9sbruce"},
        {"gamerTag": "Nicko"},
        {"gamerTag": "Rich Brown"},
        {"gamerTag": "Slither2Hunter"}
      ]
    },
    {
      "name": "Mega Smash Mondays 134",
      "shortName": "MSM 134",
      "bracketHost": "smash.gg",
      "bracketLink": "https://smash.gg/tournament/mega-smash-mondays-134/events/wii-u-singles/overview",
      "featured": false,
      "eventDate": "2018-02-19T08:00:00.000Z",
      "venue": "Thunder Studios",
      "series": "Mega Smash Mondays",
      "season": "Spring 2019",
      "eventPage": null,
      "entrantCount": 80,
      "topPlacements": [
        {"gamerTag": "falln"},
        {"gamerTag": "Asleep (Void)"},
        {"gamerTag": "Aarvark"}
      ],
      "topSeeds": [
        {"gamerTag": "Asleep (Void)"},
        {"gamerTag": "falln"},
        {"gamerTag": "K9sbruce"},
        {"gamerTag": "Eon"},
        {"gamerTag": "Aarvark"}
      ]
    },
    {
      "name": "Mega Smash Mondays 135",
      "shortName": "MSM 135",
      "bracketHost": "smash.gg",
      "bracketLink": "https://smash.gg/tournament/mega-smash-mondays-135/events/wii-u-singles/overview",
      "featured": false,
      "eventDate": "2018-02-26T08:00:00.000Z",
      "venue": "Thunder Studios",
      "series": "Mega Smash Mondays",
      "season": "Spring 2019",
      "eventPage": null,
      "entrantCount": 42,
      "topPlacements": [
        {"gamerTag": "Razo",},
        {"gamerTag": "falln"},
        {"gamerTag": "K9sbruce"}
      ],
      "topSeeds": [
        {"gamerTag": "falln"},
        {"gamerTag": "K9sbruce"},
        {"gamerTag": "Razo"},
        {"gamerTag": "Candy"},
        {"gamerTag": "Slither2Hunter"}
      ]
    },
    {
      "name": "Mega Smash Mondays 136",
      "shortName": "MSM 136",
      "bracketHost": "smash.gg",
      "bracketLink": "https://smash.gg/tournament/mega-smash-mondays-136/events/wii-u-singles/overview",
      "featured": false,
      "eventDate": "2018-03-05T08:00:00.000Z",
      "venue": "Thunder Studios",
      "series": "Mega Smash Mondays",
      "season": "Spring 2019",
      "eventPage": null,
      "entrantCount": 54,
      "topPlacements": [
        {"gamerTag": "falln"},
        {"gamerTag": "Charliedaking"},
        {"gamerTag": "K9sbruce"}
      ],
      "topSeeds": [
        {"gamerTag": "falln"},
        {"gamerTag": "Charliedaking"},
        {"gamerTag": "Eon"},
        {"gamerTag": "K9sbruce"},
        {"gamerTag": "Slither2Hunter"}
      ]
    },    
];

const tournament = {
  "name": "Mega Smash Mondays 133",
  "shortName": "MSM 133",
  "bracketHost": "smash.gg",
  "bracketLink": "https://smash.gg/tournament/mega-smash-mondays-133/events/wii-u-singles/overview",
  "featured": false,
  "eventDate": "2018-02-12T08:00:00.000Z",
  "venue": "Thunder Studios",
  "series": "Mega Smash Mondays",
  "season": "Spring 2019",
  "eventPage": null,
  "entrantCount": 76,
  "topPlacements": [
    {
      "gamerTag": "falln",
      "seed": 1,
      "placement": 1,
      "matches": "WWWWWWW",
      "id": 29
    },
    {
      "gamerTag": "Nicko",
      "seed": 3,
      "placement": 2,
      "matches": "WWWWWLWL",
      "id": 44
    },
    {
      "gamerTag": "K9sbruce",
      "seed": 2,
      "placement": 3,
      "matches": "WWWWLWWL",
      "id": 19
    }
  ],
  "topSeeds": [
    {
      "gamerTag": "falln",
      "seed": 1,
      "placement": 1,
      "matches": "WWWWWWW",
      "id": 29
    },
    {
      "gamerTag": "K9sbruce",
      "seed": 2,
      "placement": 3,
      "matches": "WWWWLWWL",
      "id": 19
    },
    {
      "gamerTag": "Nicko",
      "seed": 3,
      "placement": 2,
      "matches": "WWWWWLWL",
      "id": 44
    },
    {
      "gamerTag": "Rich Brown",
      "seed": 4,
      "placement": 7,
      "matches": "WWLWWWL",
      "id": 61
    },
    {
      "gamerTag": "Slither2Hunter",
      "seed": 5,
      "placement": 5,
      "matches": "WWWWLL",
      "id": 39
    }
  ],
  "players": [
    {
      "gamerTag": "K0rean",
      "seed": 18,
      "placement": 17,
      "matches": "WLWWL",
      "id": 0,
      "wins": 3,
      "losses": 2,
      "loser": "The Guest",
      "eliminator": "Taternator"
    },
    {
      "gamerTag": "Xenos",
      "seed": 49,
      "placement": 49,
      "matches": "LL",
      "id": 1,
      "wins": 0,
      "losses": 2,
      "loser": "Morbid Carnivorous",
      "eliminator": "9S"
    },
    {
      "gamerTag": "Taternator",
      "seed": 12,
      "placement": 13,
      "matches": "WWLWL",
      "id": 2,
      "wins": 3,
      "losses": 2,
      "loser": "Slither2Hunter",
      "eliminator": "Rich Brown"
    },
    {
      "gamerTag": "Muffin from Mars",
      "seed": 50,
      "placement": 17,
      "matches": "LWWWL",
      "id": 3,
      "wins": 3,
      "losses": 2,
      "loser": "The Guest",
      "eliminator": "Dynamo"
    },
    {
      "gamerTag": "KiraFlax",
      "seed": 8,
      "placement": 9,
      "matches": "WWLWWL",
      "id": 4,
      "wins": 4,
      "losses": 2,
      "loser": "Nitro",
      "eliminator": "Jumpsteady"
    },
    {
      "gamerTag": "Small MiracleS",
      "seed": 51,
      "placement": 17,
      "matches": "LWWWL",
      "id": 5,
      "wins": 3,
      "losses": 2,
      "loser": "Gohan",
      "eliminator": "Scizor"
    },
    {
      "gamerTag": "ThatOneRider",
      "seed": 13,
      "placement": 33,
      "matches": "LWL",
      "id": 6,
      "wins": 1,
      "losses": 2,
      "loser": "Nol&",
      "eliminator": "Gohan"
    },
    {
      "gamerTag": "Nol&",
      "seed": 52,
      "placement": 33,
      "matches": "WLL",
      "id": 7,
      "wins": 1,
      "losses": 2,
      "loser": "Rival",
      "eliminator": "Small MiracleS"
    },
    {
      "gamerTag": "Plexi",
      "seed": 39,
      "placement": 33,
      "matches": "WLL",
      "id": 8,
      "wins": 1,
      "losses": 2,
      "loser": "Scizor",
      "eliminator": "Kyle McBanterFace"
    },
    {
      "gamerTag": "ThatOneGuy",
      "seed": 53,
      "placement": 33,
      "matches": "WLWL",
      "id": 9,
      "wins": 2,
      "losses": 2,
      "loser": "Taternator",
      "eliminator": "DAS"
    },
    {
      "gamerTag": "Tenjin",
      "seed": 54,
      "placement": 49,
      "matches": "WLL",
      "id": 10,
      "wins": 1,
      "losses": 2,
      "loser": "Angbad",
      "eliminator": "Bane"
    },
    {
      "gamerTag": "Roymar",
      "seed": 32,
      "placement": 33,
      "matches": "WLL",
      "id": 11,
      "wins": 1,
      "losses": 2,
      "loser": "falln",
      "eliminator": "Aloha"
    },
    {
      "gamerTag": "Atlas",
      "seed": 55,
      "placement": 33,
      "matches": "WLWL",
      "id": 12,
      "wins": 2,
      "losses": 2,
      "loser": "Jumpsteady",
      "eliminator": "Nexus"
    },
    {
      "gamerTag": "Dynamo",
      "seed": 6,
      "placement": 13,
      "matches": "WWLWL",
      "id": 13,
      "wins": 3,
      "losses": 2,
      "loser": "Angbad",
      "eliminator": "Charger"
    },
    {
      "gamerTag": "Angbad",
      "seed": 11,
      "placement": 9,
      "matches": "WWWLL",
      "id": 14,
      "wins": 3,
      "losses": 2,
      "loser": "Nicko",
      "eliminator": "Rich Brown"
    },
    {
      "gamerTag": "Raven",
      "seed": 44,
      "placement": 33,
      "matches": "WLL",
      "id": 15,
      "wins": 1,
      "losses": 2,
      "loser": "Taternator",
      "eliminator": "Bane"
    },
    {
      "gamerTag": "jEDi",
      "seed": 36,
      "placement": 33,
      "matches": "LWWL",
      "id": 16,
      "wins": 2,
      "losses": 2,
      "loser": "HaBiB",
      "eliminator": "Sin"
    },
    {
      "gamerTag": "Malgus",
      "seed": 37,
      "placement": 49,
      "matches": "LL",
      "id": 17,
      "wins": 0,
      "losses": 2,
      "loser": "BMC",
      "eliminator": "MoosiePoo"
    },
    {
      "gamerTag": "Dynomyte",
      "seed": 56,
      "placement": 17,
      "matches": "WLWWWL",
      "id": 18,
      "wins": 4,
      "losses": 2,
      "loser": "Nitro",
      "eliminator": "Rich Brown"
    },
    {
      "gamerTag": "K9sbruce",
      "seed": 2,
      "placement": 3,
      "matches": "WWWWLWWL",
      "id": 19,
      "wins": 6,
      "losses": 2,
      "loser": "Nicko",
      "eliminator": "Nicko"
    },
    {
      "gamerTag": "Mental Minx",
      "seed": 42,
      "placement": 33,
      "matches": "WLL",
      "id": 20,
      "wins": 1,
      "losses": 2,
      "loser": "Jumpsteady",
      "eliminator": "Dynomyte"
    },
    {
      "gamerTag": "Kyle McBanterFace",
      "seed": 57,
      "placement": 25,
      "matches": "WLWWL",
      "id": 21,
      "wins": 3,
      "losses": 2,
      "loser": "KiraFlax",
      "eliminator": "Dynomyte"
    },
    {
      "gamerTag": "Blazikus",
      "seed": 58,
      "placement": 25,
      "matches": "WLWWL",
      "id": 22,
      "wins": 3,
      "losses": 2,
      "loser": "Scizor",
      "eliminator": "Nexus"
    },
    {
      "gamerTag": "HanZ()",
      "seed": 41,
      "placement": 49,
      "matches": "LWL",
      "id": 23,
      "wins": 1,
      "losses": 2,
      "loser": "Nexus",
      "eliminator": "Dynomyte"
    },
    {
      "gamerTag": "ViibeS",
      "seed": 31,
      "placement": 25,
      "matches": "WLWL",
      "id": 24,
      "wins": 2,
      "losses": 2,
      "loser": "K9sbruce",
      "eliminator": "K0rean"
    },
    {
      "gamerTag": "Jin~Tek",
      "seed": 27,
      "placement": 25,
      "matches": "WLWL",
      "id": 25,
      "wins": 2,
      "losses": 2,
      "loser": "Dynamo",
      "eliminator": "DAS"
    },
    {
      "gamerTag": "Skoop Dogg",
      "seed": 33,
      "placement": 49,
      "matches": "LWL",
      "id": 26,
      "wins": 1,
      "losses": 2,
      "loser": "Roymar",
      "eliminator": "Drago"
    },
    {
      "gamerTag": "Bane",
      "seed": 43,
      "placement": 25,
      "matches": "LWWWL",
      "id": 27,
      "wins": 3,
      "losses": 2,
      "loser": "DAS",
      "eliminator": "BMC"
    },
    {
      "gamerTag": "Tourian",
      "seed": 34,
      "placement": 65,
      "matches": "LL",
      "id": 28,
      "wins": 0,
      "losses": 2,
      "loser": "ViibeS",
      "eliminator": "Aloha"
    },
    {
      "gamerTag": "falln",
      "seed": 1,
      "placement": 1,
      "matches": "WWWWWWW",
      "id": 29,
      "wins": 7,
      "losses": 0,
      "loser": null,
      "eliminator": null
    },
    {
      "gamerTag": "Sin",
      "seed": 35,
      "placement": 25,
      "matches": "WLWL",
      "id": 30,
      "wins": 2,
      "losses": 2,
      "loser": "Nicko",
      "eliminator": "Gohan"
    },
    {
      "gamerTag": "9S",
      "seed": 59,
      "placement": 33,
      "matches": "LWWL",
      "id": 31,
      "wins": 2,
      "losses": 2,
      "loser": "Great White Salad",
      "eliminator": "K0rean"
    },
    {
      "gamerTag": "Morbid Carnivorous",
      "seed": 16,
      "placement": 17,
      "matches": "WWLL",
      "id": 32,
      "wins": 2,
      "losses": 2,
      "loser": "falln",
      "eliminator": "DAS"
    },
    {
      "gamerTag": "Raf",
      "seed": 60,
      "placement": 49,
      "matches": "LWL",
      "id": 33,
      "wins": 1,
      "losses": 2,
      "loser": "MoosiePoo",
      "eliminator": "Muffin from Mars"
    },
    {
      "gamerTag": "N",
      "seed": 61,
      "placement": 49,
      "matches": "WLL",
      "id": 34,
      "wins": 1,
      "losses": 2,
      "loser": "Rich Brown",
      "eliminator": "jEDi"
    },
    {
      "gamerTag": "Peanut",
      "seed": 62,
      "placement": 65,
      "matches": "LL",
      "id": 35,
      "wins": 0,
      "losses": 2,
      "loser": "Jason",
      "eliminator": "HanZ()"
    },
    {
      "gamerTag": "Lunatic",
      "seed": 63,
      "placement": 49,
      "matches": "LWL",
      "id": 36,
      "wins": 1,
      "losses": 2,
      "loser": "Darreb",
      "eliminator": "ThatOneGuy"
    },
    {
      "gamerTag": "negro potter",
      "seed": 64,
      "placement": 65,
      "matches": "LL",
      "id": 37,
      "wins": 0,
      "losses": 2,
      "loser": "Drago",
      "eliminator": "Bane"
    },
    {
      "gamerTag": "DAS",
      "seed": 22,
      "placement": 13,
      "matches": "WLWWWL",
      "id": 38,
      "wins": 4,
      "losses": 2,
      "loser": "Angbad",
      "eliminator": "KiraFlax"
    },
    {
      "gamerTag": "Slither2Hunter",
      "seed": 5,
      "placement": 5,
      "matches": "WWWWLL",
      "id": 39,
      "wins": 4,
      "losses": 2,
      "loser": "falln",
      "eliminator": "Jumpsteady"
    },
    {
      "gamerTag": "Gohan",
      "seed": 14,
      "placement": 17,
      "matches": "WLWWL",
      "id": 40,
      "wins": 3,
      "losses": 2,
      "loser": "Charger",
      "eliminator": "KiraFlax"
    },
    {
      "gamerTag": "Arrow",
      "seed": 30,
      "placement": 25,
      "matches": "LWWWL",
      "id": 41,
      "wins": 3,
      "losses": 2,
      "loser": "Sin",
      "eliminator": "Small MiracleS"
    },
    {
      "gamerTag": "Ur-n8kedgrandma",
      "seed": 17,
      "placement": 33,
      "matches": "WLL",
      "id": 42,
      "wins": 1,
      "losses": 2,
      "loser": "Morbid Carnivorous",
      "eliminator": "Muffin from Mars"
    },
    {
      "gamerTag": "Jumpsteady",
      "seed": 10,
      "placement": 4,
      "matches": "WWWLWWWL",
      "id": 43,
      "wins": 6,
      "losses": 2,
      "loser": "K9sbruce",
      "eliminator": "K9sbruce"
    },
    {
      "gamerTag": "Nicko",
      "seed": 3,
      "placement": 2,
      "matches": "WWWWWLWL",
      "id": 44,
      "wins": 6,
      "losses": 2,
      "loser": "falln",
      "eliminator": null
    },
    {
      "gamerTag": "Rival",
      "seed": 20,
      "placement": 9,
      "matches": "WWWLL",
      "id": 45,
      "wins": 3,
      "losses": 2,
      "loser": "Slither2Hunter",
      "eliminator": "Charger"
    },
    {
      "gamerTag": "Chris James",
      "seed": 47,
      "placement": 65,
      "matches": "LL",
      "id": 46,
      "wins": 0,
      "losses": 2,
      "loser": "K0rean",
      "eliminator": "Raf"
    },
    {
      "gamerTag": "AlexAnthony",
      "seed": 48,
      "placement": 65,
      "matches": "LL",
      "id": 47,
      "wins": 0,
      "losses": 2,
      "loser": "Ur-n8kedgrandma",
      "eliminator": "9S"
    },
    {
      "gamerTag": "Drago",
      "seed": 65,
      "placement": 33,
      "matches": "WLWL",
      "id": 48,
      "wins": 2,
      "losses": 2,
      "loser": "falln",
      "eliminator": "ViibeS"
    },
    {
      "gamerTag": "Darreb",
      "seed": 66,
      "placement": 49,
      "matches": "WLL",
      "id": 49,
      "wins": 1,
      "losses": 2,
      "loser": "K9sbruce",
      "eliminator": "Aloha"
    },
    {
      "gamerTag": "Nitro",
      "seed": 9,
      "placement": 5,
      "matches": "WWWLWWL",
      "id": 50,
      "wins": 5,
      "losses": 2,
      "loser": "falln",
      "eliminator": "K9sbruce"
    },
    {
      "gamerTag": "Lord Bahamut",
      "seed": 23,
      "placement": 49,
      "matches": "LWL",
      "id": 51,
      "wins": 1,
      "losses": 2,
      "loser": "Mental Minx",
      "eliminator": "Atlas"
    },
    {
      "gamerTag": "Jason",
      "seed": 67,
      "placement": 49,
      "matches": "WLL",
      "id": 52,
      "wins": 1,
      "losses": 2,
      "loser": "Nicko",
      "eliminator": "Arrow"
    },
    {
      "gamerTag": "Nexus",
      "seed": 24,
      "placement": 17,
      "matches": "WLWWL",
      "id": 53,
      "wins": 3,
      "losses": 2,
      "loser": "Nitro",
      "eliminator": "Charger"
    },
    {
      "gamerTag": "Shaggy",
      "seed": 68,
      "placement": 65,
      "matches": "LL",
      "id": 54,
      "wins": 0,
      "losses": 2,
      "loser": "N",
      "eliminator": "Lord Bahamut"
    },
    {
      "gamerTag": "The Guest",
      "seed": 15,
      "placement": 17,
      "matches": "WWLL",
      "id": 55,
      "wins": 2,
      "losses": 2,
      "loser": "K9sbruce",
      "eliminator": "BMC"
    },
    {
      "gamerTag": "HaBiB",
      "seed": 29,
      "placement": 33,
      "matches": "WLL",
      "id": 56,
      "wins": 1,
      "losses": 2,
      "loser": "Rich Brown",
      "eliminator": "Arrow"
    },
    {
      "gamerTag": "ChrisTheHatMan",
      "seed": 38,
      "placement": 49,
      "matches": "LL",
      "id": 57,
      "wins": 0,
      "losses": 2,
      "loser": "Jin~Tek",
      "eliminator": "Great White Salad"
    },
    {
      "gamerTag": "A2ZOMG",
      "seed": 26,
      "placement": 49,
      "matches": "LL",
      "id": 58,
      "wins": 0,
      "losses": 2,
      "loser": "Plexi",
      "eliminator": "Blazikus"
    },
    {
      "gamerTag": "MoosiePoo",
      "seed": 69,
      "placement": 33,
      "matches": "WLWL",
      "id": 59,
      "wins": 2,
      "losses": 2,
      "loser": "Slither2Hunter",
      "eliminator": "Jin~Tek"
    },
    {
      "gamerTag": "Freedom",
      "seed": 40,
      "placement": 49,
      "matches": "LL",
      "id": 60,
      "wins": 0,
      "losses": 2,
      "loser": "Zfly",
      "eliminator": "Kyle McBanterFace"
    },
    {
      "gamerTag": "Rich Brown",
      "seed": 4,
      "placement": 7,
      "matches": "WWLWWWL",
      "id": 61,
      "wins": 5,
      "losses": 2,
      "loser": "Rival",
      "eliminator": "Jumpsteady"
    },
    {
      "gamerTag": "Great White Salad",
      "seed": 70,
      "placement": 33,
      "matches": "WLWL",
      "id": 62,
      "wins": 2,
      "losses": 2,
      "loser": "Dynamo",
      "eliminator": "BMC"
    },
    {
      "gamerTag": "BMC",
      "seed": 28,
      "placement": 13,
      "matches": "WLWWWL",
      "id": 63,
      "wins": 4,
      "losses": 2,
      "loser": "Slither2Hunter",
      "eliminator": "Scizor"
    },
    {
      "gamerTag": "Omega",
      "seed": 71,
      "placement": 65,
      "matches": "LL",
      "id": 64,
      "wins": 0,
      "losses": 2,
      "loser": "Blazikus",
      "eliminator": "TomaHawk"
    },
    {
      "gamerTag": "Zfly",
      "seed": 25,
      "placement": 33,
      "matches": "WLL",
      "id": 65,
      "wins": 1,
      "losses": 2,
      "loser": "KiraFlax",
      "eliminator": "Blazikus"
    },
    {
      "gamerTag": "Scizor",
      "seed": 7,
      "placement": 9,
      "matches": "WWLWWL",
      "id": 66,
      "wins": 4,
      "losses": 2,
      "loser": "Jumpsteady",
      "eliminator": "Nitro"
    },
    {
      "gamerTag": "TomaHawk",
      "seed": 45,
      "placement": 49,
      "matches": "LWL",
      "id": 67,
      "wins": 1,
      "losses": 2,
      "loser": "Rival",
      "eliminator": "ThatOneRider"
    },
    {
      "gamerTag": "Rat~chan",
      "seed": 72,
      "placement": 65,
      "matches": "LL",
      "id": 68,
      "wins": 0,
      "losses": 2,
      "loser": "Kyle McBanterFace",
      "eliminator": "Trainer_UpTilt"
    },
    {
      "gamerTag": "Trainer_UpTilt",
      "seed": 46,
      "placement": 49,
      "matches": "LWL",
      "id": 69,
      "wins": 1,
      "losses": 2,
      "loser": "Charger",
      "eliminator": "Small MiracleS"
    },
    {
      "gamerTag": "Charger",
      "seed": 19,
      "placement": 7,
      "matches": "WWLWWWL",
      "id": 70,
      "wins": 5,
      "losses": 2,
      "loser": "Nicko",
      "eliminator": "Nitro"
    },
    {
      "gamerTag": "Idol Trash",
      "seed": 73,
      "placement": 65,
      "matches": "LL",
      "id": 71,
      "wins": 0,
      "losses": 2,
      "loser": "Dynomyte",
      "eliminator": "Arrow"
    },
    {
      "gamerTag": "DJG",
      "seed": 74,
      "placement": 65,
      "matches": "LL",
      "id": 72,
      "wins": 0,
      "losses": 2,
      "loser": "Atlas",
      "eliminator": "jEDi"
    },
    {
      "gamerTag": "eLLis",
      "seed": 75,
      "placement": 65,
      "matches": "LL",
      "id": 73,
      "wins": 0,
      "losses": 2,
      "loser": "Tenjin",
      "eliminator": "Skoop Dogg"
    },
    {
      "gamerTag": "Aru 7.62mmR",
      "seed": 21,
      "placement": 65,
      "matches": "LL",
      "id": 74,
      "wins": 0,
      "losses": 2,
      "loser": "Raven",
      "eliminator": "Lunatic"
    },
    {
      "gamerTag": "Aloha",
      "seed": 76,
      "placement": 25,
      "matches": "LWWWL",
      "id": 75,
      "wins": 3,
      "losses": 2,
      "loser": "ThatOneGuy",
      "eliminator": "Muffin from Mars"
    }
  ]
};

const TournamentsContainer = styled.main`    
    padding-top: 100px;
    margin: 0 auto;
    width: min-content;

    @media screen and (max-width: 706px){
      width: unset;
    }
`;

const TournamentsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(268px, 1fr) minmax(620px, 1fr) minmax(340px, 1fr);
  gap: 20px 20px;  
  margin-left: 3%;
  margin-right: 3%;

  @media screen and (max-width: 1300px) {            
        grid-template-columns: minmax(268px, 1fr) minmax(600px, 2fr);            
        margin: 0 auto;                      
        //padding-right: 20px;       
    }    

    @media screen and (max-width: 960px){
        grid-template-columns: 264px minmax(408px, 1fr);
        gap: 8px 20px;//subject to change
    }

    @media screen and (max-width: 706px){
        grid-template-columns: 1fr;         
    }
    @media screen and (max-width: 480px) {    
        display: flex;
        flex-direction: column;
    }
`;

const Tournaments = (props) => (
    <TournamentsContainer>
      <TournamentsGrid>
        <TournamentsUpcoming/>
        <TournamentsList tournaments = {tournaments}/>        
        <TournamentsDetails tournament = {tournament}/>        
      </TournamentsGrid>
      <TournamentsSearch/>
    </TournamentsContainer>
  );

export default Tournaments;