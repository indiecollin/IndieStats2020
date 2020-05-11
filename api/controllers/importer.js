const schemas = require('../schemas');
const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const R = require('ramda');
const router = express.Router();
Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/IndieStats', { useNewUrlParser: true });
   
router.route('/smashgg')
.post((req,res) => {              
    let phaseGroups =[];
    new Promise((resolve,reject) => {//pulls tournament phases from smash.gg                
        request('https://api.smash.gg/tournament/' + req.body.link + '/event/' + req.body.game + '?expand[]=phase', (err,res,body) => {                                    
            
            if(err){                                
                reject(new Error("Error occured while making request: " + err));
            }
            else if(res.statusCode < 200 || res.statusCode > 299){                                
                reject(new Error('ErrorCode: ' + res.statusCode));
            }
            else{                                               
                resolve(JSON.parse(body).entities.phase
                .filter(p => !req.body.bracketExclusions.includes(p.name))
                .map(p => p.id));//pulls all phases for the game
            }
        })
    })
    .then((phases) => {     
        return new Promise((resolve,reject) => {//pulls tournament phase groups from smashh.gg
            request('https://api.smash.gg/tournament/' + req.body.link + '?expand[]=groups', (err,res,body) => {                                    
                if(err){                                
                    reject(new Error("Error occured while making request: " + err));
                }
                else if(res.statusCode < 200 || res.statusCode > 299){                                
                    reject(new Error('ErrorCode: ' + res.statusCode));
                }
                else{                               
                    phaseGroups = JSON.parse(body).entities.groups.filter(g => g.groupTypeId === 2 && phases.includes(g.phaseId)).map(g => g.id);//filters out extra events               
                    resolve();                
                }
            })
        })
    })
    .then(() => {                
        return new Promise((resolve,reject) => {//pulls tournament data        
            request('https://api.smash.gg/tournament/'+ req.body.link, (err,res,body) => {
                if(err){                                
                    reject(new Error("Error occured while making request: " + err));
                }
                else if(res.statusCode < 200 || res.statusCode > 299){                                
                    reject(new Error('ErrorCode: ' + res.statusCode));
                }
                else{                                 
                    const tournamentData = JSON.parse(body);                    
                    const date = new Date(tournamentData.entities.tournament.startAt*1000);
                    const tournamentListing = {
                        name: req.body.name + req.body.count > 1 ? (' ' + req.body.count) : '',
                        shortName: req.body.series.code.toUpperCase() + ' ' + req.body.series.count,
                        bracketHost: 'smash.gg',                        
                        bracketLink: 'https://smash.gg/tournament/' + req.body.link + '/events/' + req.body.game + '/overview',                        
                        featured: false,
                        eventDate: new Date(date.getFullYear(),date.getMonth(),date.getDate()),
                        venue: req.body.shortVenue ? req.body.shortVenue : tournamentData.entities.tournament.venueName,
                        series: req.body.series.name,
                        season: req.body.season ? req.body.season : null,
                        eventPage: tournamentData.entities.tournament.links ? tournamentData.entities.tournament.links.facebook : null
                    };                            
                    resolve(tournamentListing);                                                            
                }
            })
        })
    })
    .then((tournamentListing) => {//pulls entrants data                    
        let promises = [];
        phaseGroups.forEach(phaseGroup => {
            promises.push(
                new Promise((resolve, reject) => {//technically only needs the first round of pools for entrants. update later?
                    request('https://api.smash.gg/phase_group/' + phaseGroup + '?expand[]=entrants', (err,res,body) => {
                        if(err){                                
                            reject(new Error("Error occured while making request: " + err));
                        }
                        else if(res.statusCode < 200 || res.statusCode > 299){                                
                            reject(new Error('ErrorCode: ' + res.statusCode));
                        }
                        else{                                                            
                            const entrantData = JSON.parse(body).entities;
                            const entrants = entrantData.entrants.map(entrant =>{                     
                                return{
                                    smashggId: entrant.id,//used to condition/assign entrant values
                                    gamerTag: entrantData.player.find(player => player.id == Object.values(entrant.playerIds)[0]).gamerTag,
                                    seed: entrant.initialSeedNum,
                                    placement: entrant.finalPlacement,
                                    matches: '',
                                    phaseFlag: Number.MAX_SAFE_INTEGER                                    
                                };
                            });                              
                            const tournament = { entrants: entrants };
                            tournamentListing.entrantCount = entrants.length;
                            resolve({
                                tournamentListing: tournamentListing,
                                tournament: tournament                                             
                            });        
                        }
                    })
                })
            );            
        });
        return Promise.all(promises).then(entrantsData =>{
            const entrants = entrantsData.reduce((acc, cur) =>{
                const newEntrants = cur.tournament.entrants.filter(entrant =>{
                    return!acc.map(e => e.gamerTag).includes(entrant.gamerTag) && !req.body.exclusions.includes(entrant.smashggId)
                });
                return acc.concat(newEntrants ); 
            }, []);
            const tournamentListing = Object.assign(entrantsData[0].tournamentListing, {entrantCount: entrants.length} );
            return {entrants: entrants, tournamentListing: tournamentListing};
        });
    })
    .then((allTournamentData) => {//pulls match data and update/creates player records
        let promises = [];
        phaseGroups.forEach(phaseGroup => {
            promises.push( new Promise(function(resolve, reject){        
            request('https://api.smash.gg/phase_group/' + phaseGroup + '?expand[]=sets', (err,res,body) => {                                    
                if(err){                                
                    reject(new Error("Error occured while making request: " + err));
                }
                else if(res.statusCode < 200 || res.statusCode > 299){                                
                    reject(new Error('ErrorCode: ' + res.statusCode));
                }
                else{                            
                    const matchData = JSON.parse(body); 
                    const matches = matchData.entities.sets.sort((m1, m2)=>{
                        if(m1.wOverallPlacement === 1 && m2.wOverallPlacement === 1){//if comparing GF vs GFR                            
                            if(m1.entrant1PrereqCondition !==  m1.entrant2PrereqCondition){
                                return 1;
                            }
                            else return -1;
                        }
                        else if(m1.wOverallPlacement===1){//GF always goes last
                            return 1;
                        }
                        else if(m2.wOverallPlacement==1){//GF always goes last
                            return -1;
                        }
                        else if(m1.round*m2.round>0){//if both in losers or both in winners
                            return (Math.abs(m1.round) - Math.abs(m2.round));
                        }
                        else{
                            return m1.round > 0 ? -1 : 1 ;//winners before losers
                        }
                    });   
                    let allDataWithMatches = R.clone(allTournamentData);                 
                    allDataWithMatches.numProgressing = matchData.entities.groups.numProgressing;
                    allDataWithMatches.playerRecords = {};                      
                    allDataWithMatches.winnerRounds = 0;
                    allDataWithMatches.loserRounds = 0;                                     
                    allDataWithMatches.matches = matches.map(match => {    
                        
                        if(match.round > allDataWithMatches.winnerRounds && match.winnerId && match.loserId){
                            allDataWithMatches.winnerRounds = match.round;//updates to latest seen round
                        }
                        if(match.round < -allDataWithMatches.loserRounds && match.winnerId && match.loserId){
                            allDataWithMatches.loserRounds = Math.abs(match.round);//updates to latest seen round
                        }
                        //currently not fully handling DQs                        
                        if(!(match.loserId && match.winnerId && !req.body.exclusions.includes(match.loserId) && !req.body.exclusions.includes(match.winnerId))){return null;}//DQ stuff
                        //assigns match record values
                        let winnerIndex = allDataWithMatches.entrants.findIndex(entrant => entrant.smashggId === match.winnerId);                       
                        let loserIndex = allDataWithMatches.entrants.findIndex(entrant => entrant.smashggId === match.loserId);
                        let winnerGamerTag = allDataWithMatches.entrants[winnerIndex].gamerTag;
                        let loserGamerTag = allDataWithMatches.entrants[loserIndex].gamerTag;    
                        if(match.winnerId && match.loserId){                            
                            allDataWithMatches.entrants[winnerIndex].matches += 'W';
                            allDataWithMatches.entrants[loserIndex].matches += 'L';                            
                        }
                        const winnerScore = match.entrant1Score > match.entrant2Score ? match.entrant1Score : match.entrant2Score;
                        const loserScore = match.entrant1Score < match.entrant2Score ? match.entrant1Score : match.entrant2Score;                        
                        if(allDataWithMatches.playerRecords[winnerGamerTag]){//update tournament's player objects            
                            //sometimes game losses is undefined yet everything works. Keep that mind for future bugs
                            allDataWithMatches.playerRecords[winnerGamerTag].gameWins = allDataWithMatches.playerRecords[winnerGamerTag].gameWins + winnerScore;
                            allDataWithMatches.playerRecords[winnerGamerTag].gameLosses = allDataWithMatches.playerRecords[winnerGamerTag].gameLosses + loserScore;
                            allDataWithMatches.playerRecords[winnerGamerTag].setWins = allDataWithMatches.playerRecords[winnerGamerTag].setWins + 1;                            
                        }
                        else{//create tournament's player objects
                            allDataWithMatches.playerRecords[winnerGamerTag] = {
                                gamerTag: winnerGamerTag,
                                gameWins: winnerScore,
                                gameLosses: loserScore,
                                setWins: 1,
                                setLosses: 0
                            };  
                        }                        
                        if(allDataWithMatches.playerRecords[loserGamerTag]){//update tournament's player objects                                   
                            allDataWithMatches.playerRecords[loserGamerTag].gameWins = allDataWithMatches.playerRecords[loserGamerTag].gameWins + loserScore;
                            allDataWithMatches.playerRecords[loserGamerTag].gameLosses = allDataWithMatches.playerRecords[loserGamerTag].gameLosses + winnerScore;
                            allDataWithMatches.playerRecords[loserGamerTag].setLosses = allDataWithMatches.playerRecords[loserGamerTag].setLosses + 1;               
                        }
                        else{//create tournament's player objects
                            allDataWithMatches.playerRecords[loserGamerTag] = {
                                gamerTag: loserGamerTag,
                                gameWins: loserScore,
                                gameLosses: winnerScore,
                                setWins: 0,
                                setLosses: 1
                            };
                        }                                 
                        return{                            
                            winnerId: winnerIndex,
                            loserId: loserIndex,
                            winnerScore: winnerScore,
                            loserScore: loserScore,
                            placement: match.shortRoundText == 'GFR' ? 0 : match.wOverallPlacement,
                            round: (match.shortRoundText == 'GFR' ? 1 : 0) + Math.abs(match.round) ,//if reset increment
                            bracket: match.round > 0//true = winners, false = losers
                        }
                    }).filter(match => match != null);//remove DQs     
                    allDataWithMatches.playerRecords = Object.entries(allDataWithMatches.playerRecords).map(player => player[1]);         
                    resolve(allDataWithMatches);
                }
            })            
        })
    )});
    return Promise.all(promises).then(allTournamentData =>{
        let numProgressing = allTournamentData[0].numProgressing;
        let winnersOffset = 0;
        let lastWinnersOffset = allTournamentData[0].winnerRounds;
        let losersOffset = 0;
        let lastLosersOffset = allTournamentData[0].loserRounds;
        return allTournamentData.reduce((acc, cur) =>{
            if(cur.numProgressing < numProgressing){
                numProgressing = cur.numProgressing;
                winnersOffset += lastWinnersOffset;
                losersOffset  += lastLosersOffset;
                lastWinnersOffset = cur.winnerRounds;
                lastLosersOffset = cur.loserRounds;
            }
            cur.matches.forEach(match => {
                match.round += match.round > 0 ? winnersOffset : -losersOffset;
            });
            acc.matches = acc.matches.concat(cur.matches);        
            cur.entrants.forEach(entrant =>{
                if(numProgressing < entrant.phaseFlag){
                    let curIndex = acc.entrants.findIndex(e => e.smashggId === entrant.smashggId);                    
                        acc.entrants[curIndex].matches += entrant.matches;    
                        acc.entrants[curIndex].phaseFlag = numProgressing;                 
                }                
            });   
            cur.playerRecords.forEach(player => {
                const playerIndex = acc.playerRecords.findIndex(p => p.gamerTag === player.gamerTag);
                if(playerIndex > 0){
                    acc.playerRecords[playerIndex].gameWins += player.gameWins;
                    acc.playerRecords[playerIndex].gameLosses += player.gameLosses;
                    acc.playerRecords[playerIndex].setWins += player.setWins;
                    acc.playerRecords[playerIndex].setLosses += player.setLosses;
                }
                else{
                    acc.playerRecords.push(player);
                }
            });                                      
            return acc;        
        });
    });//fix indentation
    })
    .then((allTournamentData) => {        
        return new Promise((resolve,reject) => {                    
            let existingPlayers = {}         
            schemas.player.find({ gamerTag:{ $in: allTournamentData.entrants.map(entrant => entrant.gamerTag)}})
            .then(players =>{
                players.forEach(player => {//update tournament player's values with existing record values
                existingPlayers[player.gamerTag] = {
                        gamerTag: player.gamerTag,
                        gameWins : player.gameWins,
                        gameLosses : player.gameLosses,
                        setWins : player.setWins,
                        setLosses : player.setLosses                    
                    };                    
                });
                allTournamentData.playerRecords.forEach(player => {                    
                    if(existingPlayers[player.gamerTag]){
                        player.gameWins += existingPlayers[player.gamerTag].gameWins;
                        player.gameLosses += existingPlayers[player.gamerTag].gameLosses;
                        player.setWins += existingPlayers[player.gamerTag].setWins;
                        player.setLosses += existingPlayers[player.gamerTag].setLosses;
                    }
                });
                resolve(allTournamentData);
            });            
        }).catch(err =>{            
            reject(new Error("Error occured while loading player records: " + err));              
        });        
    })
    .then((allTournamentData) => {          
        schemas.tournamentListing.collection.insert(            
            allTournamentData.tournamentListing,   
            function(err, response){
                if(err){
                    res.status(404).send(err.message);
                }
                else{
                    let id = response.ops[0]._id;
                    schemas.tournament.collection.insert({                    
                        _id: id,
                        entrants: allTournamentData.entrants.map((entrant, index) => {
                            delete entrant.smashggId;
                            delete entrant.phaseFlag;
                            entrant.id = index;
                            return entrant;
                        }),
                        matches: allTournamentData.matches
                    },
                    function(err, response){
                        if(err){
                            res.status(404).send(err.message);
                        }
                        else{
                            const bulkOps = allTournamentData.playerRecords.map(player => ({
                                updateOne: {
                                    filter: { gamerTag: player.gamerTag },                                    
                                    update: {
                                        $set: { 
                                            gameWins: player.gameWins,                                      
                                            gameLosses: player.gameLosses,
                                            setWins: player.setWins,
                                            setLosses: player.setLosses
                                        },
                                     },
                                    upsert: true,
                                    collation: { locale: 'en', strength: 1}
                                }
                             }));
                             schemas.player.collection.bulkWrite(bulkOps)
                             .then(response => {                                                                                          
                                res.status(200).send('tournament successfully uploaded');                                                         
                             })
                             .catch(err => {
                                res.status(404).send(err.message);
                             });                                                        
                        }
                    });
                }
            }
        );                       
    }).catch((err) => {
        res.status(404).send(err.message);            
    });
});  

router.route('/dupeCheck/smashgg')
.get((req,res) => {              
    let phaseGroups =[];
    new Promise((resolve,reject) => {//pulls tournament phases from smash.gg                
        request('https://api.smash.gg/tournament/' + req.body.link + '/event/' + req.body.game, (err,res,body) => {                                    
            
            if(err){                                
                reject(new Error("Error occured while making request: " + err));
            }
            else if(res.statusCode < 200 || res.statusCode > 299){                                
                reject(new Error('ErrorCode: ' + res.statusCode));
            }
            else{                                               
                resolve(Object.keys(JSON.parse(body).entities.event.publishing.bracket).map(p => parseInt(p)));//pulls all phases for the game
            }
        })
    })
    .then((phases) => {     
        return new Promise((resolve,reject) => {//pulls tournament phase groups from smashh.gg
            request('https://api.smash.gg/tournament/' + req.body.link + '?expand[]=groups', (err,res,body) => {                                    
                if(err){                                
                    reject(new Error("Error occured while making request: " + err));
                }
                else if(res.statusCode < 200 || res.statusCode > 299){                                
                    reject(new Error('ErrorCode: ' + res.statusCode));
                }
                else{                               
                    phaseGroups = JSON.parse(body).entities.groups.filter(g => g.groupTypeId === 2 && phases.includes(g.phaseId)).map(g => g.id);//filters out extra events               
                    resolve();                
                }
            })
        })
    })  
    .then(() => {//pulls pool size    
        return new Promise((resolve, reject) => {//technically only needs the first round of pools for entrants. update later?      
            request('https://api.smash.gg/phase_group/' + phaseGroups[0] + '?expand[]=sets', (err,res,body) => {  
                if(err){                                
                    reject(new Error("Error occured while making request: " + err));
                }
                else if(res.statusCode < 200 || res.statusCode > 299){                                
                    reject(new Error('ErrorCode: ' + res.statusCode));
                }
                else{                 
                    resolve(JSON.parse(body).entities.groups.numProgressing);
                }
            })
        })
    })
    .then(poolSize => {
        let promises = [];
        phaseGroups.forEach(phaseGroup => {
            promises.push( new Promise(function(resolve, reject){      
                request('https://api.smash.gg/phase_group/' + phaseGroup + '?expand[]=sets', (err,res,body) => {                                    
                    if(err){                                
                        reject(new Error("Error occured while making request: " + err));
                    }
                    else if(res.statusCode < 200 || res.statusCode > 299){                                
                        reject(new Error('ErrorCode: ' + res.statusCode));
                    }
                    else{ 
                        const matchData = JSON.parse(body); 
                        if(matchData.entities.groups.numProgressing !== poolSize ){
                            resolve(null)
                        }               
                        else{
                            resolve(phaseGroup)
                        }     
                    }           
                })
            }))
        });
        return Promise.all(promises).then(poolData =>{            
            return poolData;
        });
    })
    .then((pools => {//pulls entrants data                 
        let promises = [];
        pools.forEach(pool => {
            if(!pool){
                return;
            }
            promises.push(
                new Promise((resolve, reject) => {//technically only needs the first round of pools for entrants. update later?
                    request('https://api.smash.gg/phase_group/' + pool + '?expand[]=entrants', (err,res,body) => {
                        if(err){                                
                            reject(new Error("Error occured while making request: " + err));
                        }
                        else if(res.statusCode < 200 || res.statusCode > 299){                                
                            reject(new Error('ErrorCode: ' + res.statusCode));
                        }
                        else{                                                                                   
                            const entrantData = JSON.parse(body).entities;
                            const entrants = entrantData.entrants.map(entrant =>{                     
                                return{//why is this line hit so many times?
                                    smashggId: entrant.id,//used to condition/assign entrant values                      
                                    gamerTag: entrantData.player.find(player => player.entrantId == entrant.id).gamerTag,
                                    pool: pool                                
                                };
                            });                              
                            resolve(entrants);
                        }
                    })
                })
            );            
        });
        return Promise.all(promises).then(entrantsData =>{
            const entrants = entrantsData.reduce((acc, cur) => acc.concat(cur));           
            let entrantsChecklist = {};
            let duplicates = [];
            entrants.forEach(e =>{
                if(entrantsChecklist[e.gamerTag]){
                    duplicates.push(entrantsChecklist[e.gamerTag]);
                    duplicates.push(e);                    
                }
                else{
                    entrantsChecklist[e.gamerTag] = e;
                }
            })
            return duplicates.length ? {phaseGroups: phaseGroups, duplicates: duplicates } : null;            
        });
    }))
    .then(duplicates => {
        if(duplicates){
            res.json(duplicates);
        }
        else{
            res.status(200).send('No Duplicates Found');
        }        
    })
    .catch((err) => {
        res.status(404).send(err.message);            
    });
});  

module.exports = router;