const schemas = require('../schemas');
const express = require('express');
const router = express.Router();
const powerRanks = require('../data/powerRanks');

let ordinal = function(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
};

router.route('/players/player/:gamerTag')
.get((req,res) => {  
    schemas.player.find({ gamerTag: req.params.gamerTag},{_id: 0})
    .collation({locale: "en", strength: 1})
    .then(player => {
        if(player && player.length){res.json(player[0]);}
        else{res.status(404).send('Player Not Found.');}     
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);        
    });
});

router.route('/players/powerRanks')
.get((req,res) => {      
    schemas.player.find({ powerRank: { $ne: null }},{_id: 0}).sort('powerRank')
    .then(players => {              
        if(players && players.length){res.json(players);}
        else{ res.status(404).send('Ranked Players Not Found.'); }
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);        
    });
});

router.route('/players/listing')
.get((req,res) => {      
    schemas.player.find({},{_id: 0}).sort('gamerTag')
    .then(players => {              
        if(players && players.length){res.json(players);}
        else{ res.status(404).send('No Players Not Found.'); }
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);        
    });
});

router.route('/players/tournamentListings/:gamerTag')//make this for preview listing
.get((req, res) => {//error check count?
    schemas.tournament.find({ entrants: { $elemMatch: { gamerTag : req.params.gamerTag } } }).sort({eventDate: -1 }).limit(req.query.count ? parseInt(req.query.count) : 0 )
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments =>{        
        if(tournaments && tournaments.length){            
            schemas.tournamentListing.find({_id: {$in : tournaments.map(tournament => tournament._id)}})
            .then(tournamentListings => {
                res.json(tournamentListings);
            });
        }
        else{ res.status(404).send('No Tournaments Found For ' + req.params.gamerTag + '.'); }        
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/tournaments/:gamerTag')//make this for detailed listing
.get((req, res) => {//error check count?
    schemas.tournament.find({ entrants: { $elemMatch: { gamerTag : req.params.gamerTag } } }).sort({eventDate: -1 }).limit(req.query.count ? parseInt(req.query.count) : 0 )
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments =>{
        if(tournaments && tournaments.length){ 
            let playersTournaments = {tournaments: []};            
            schemas.tournamentListing.find({ _id: { $in: tournaments.map(tournament => tournament._id) }}).lean()
            .then(tournamentListings => {                   
                tournamentListings.forEach(tournamentListing => {                    
                    const curTournament = tournaments.find(tournament => {return tournament._id.toString() == tournamentListing._id.toString();});//rotate tournament here?                    
                    const entrant = curTournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.gamerTag.toUpperCase());                                                            
                    const losses = curTournament.matches.filter(match => match.loserId == entrant.id).map((match, index, losses) => {
                        return {
                            bracket: match.bracket && !(entrant.placement!= 1 && losses.length == 2 && losses.every(loss => loss.bracket) && index), 
                            winner: curTournament.entrants.find(entrant => entrant.id == match.winnerId).gamerTag
                        };                                                                       
                    });                                        
                    playersTournaments.tournaments.push({
                        name: tournamentListing.name,
                        date: tournamentListing.date,
                        entrants: tournamentListing.entrants,
                        shortName: tournamentListing.shortName,//make sure this sort works properly      
                        top3: curTournament.entrants.filter( entrant => entrant.placement <= 3).sort((entrant1, entrant2) => entrant1.placement > entrant2.placement).map(entrant => entrant.gamerTag),
                        placement: entrant.placement,
                        seed: entrant.seed,
                        wins: curTournament.matches.filter(match => match.winnerId == entrant.id).length,//DQs?
                        losses: curTournament.matches.filter(match => match.loserId == entrant.id).length,//DQs?
                        loser: losses.find(loss => loss.bracket) ? losses.find(loss => loss.bracket).winner : null,//DQs?
                        eliminator: losses.find(loss => !loss.bracket) ? losses.find(loss => !loss.bracket).winner : null//DQs? RESETS?
                    });       
                    tournaments.splice(-1, 0, tournaments.shift());//rotate tournament to improve search speed
                });                
                res.json(playersTournaments);
            });
        }
        else{ res.status(404).send('No Tournaments Found For ' + req.params.gamerTag + '.'); }    
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/tournamentsAttended/:gamerTag')
.get((req, res) => {
    schemas.tournament.countDocuments({ entrants: { $elemMatch: { gamerTag : req.params.gamerTag } } })  
    .collation({locale: "en", strength: 1})
    .then(count =>{count ? res.json({count: count}) : res.status(404).send('No Tournaments Found For ' + req.params.gamerTag + '.');
        res.json({count: count});
    })  
    .catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/rivals/:gamerTag')//may want to update this route to return an array of objects
.get((req, res) => {
    schemas.tournament.find({ entrants: { $elemMatch: { gamerTag : req.params.gamerTag } } })
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments =>{
        if(tournaments && tournaments.length){
            let rivals = {};
            tournaments.forEach(tournament => {
                const entrant = tournament.entrants.find(entrant => {
                    return entrant.gamerTag.toUpperCase() == req.params.gamerTag.toUpperCase();
                });                
                tournament.matches.forEach(match => {
                    if(match.winnerId == entrant.id){
                        const rival = tournament.entrants[match.loserId].gamerTag;                     
                        if(rivals[rival]){
                            rivals[rival].gameWins = rivals[rival].gameWins + match.winnerScore;
                            rivals[rival].gameLosses = rivals[rival].gameLosses + match.loserScore;
                            rivals[rival].setWins = rivals[rival].setWins + 1;                            
                        }
                        else{                            
                            rivals[rival] = {
                                gameWins: match.winnerScore,
                                setWins: 1,
                                gameLosses: match.loserScore,
                                setLosses: 0
                            };                            
                        }
                    }
                    else if(match.loserId == entrant.id){
                        const rival = tournament.entrants[match.winnerId].gamerTag;
                        if(rivals[rival]){
                            rivals[rival].gameWins = rivals[rival].gameWins + match.loserScore;
                            rivals[rival].gameLosses = rivals[rival].gameLosses + match.winnerScore;
                            rivals[rival].setLosses = rivals[rival].setLosses + 1;
                        }
                        else{
                            rivals[rival] = {
                                gameWins: match.loserScore,
                                setWins: 0,
                                gameLosses: match.winnerScore,
                                setLosses: 1
                            };
                        }
                    }
                });                
            });
            res.json(rivals);
        }
        else{ res.status(404).send('No Tournaments Found For ' + req.params.gamerTag + '.'); }        
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/mostLosses/:gamerTag')
.get((req, res) => {
    schemas.tournament.find({ entrants: { $elemMatch: { gamerTag : req.params.gamerTag } } })  
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments =>{
        if(tournaments && tournaments.length){//DQs?
            let opponents = {};
            let mostLossesTo = {opponent:'', wins: 0};
            tournaments.forEach(tournament=>{
                const playerId = tournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.gamerTag.toUpperCase()).id;            
                tournament.matches.forEach(match=>{                    
                    if(match.loserId == playerId){
                        const curOpponent = tournament.entrants.find(entrant => entrant.id == match.winnerId).gamerTag;
                        opponents[curOpponent] ? opponents[curOpponent].wins++ : opponents[curOpponent] = {wins: 1};
                        if(opponents[curOpponent].wins > mostLossesTo.wins){ mostLossesTo = {opponent: curOpponent, wins: opponents[curOpponent].wins}; } 
                    }
                });
            });
            res.json({player: mostLossesTo.opponent});
        }
        else{ res.status(404).send('No Matches Found For ' + req.params.gamerTag + '.'); } 
    })  
    .catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/avgPlacement/:gamerTag')
.get((req, res) => {
    schemas.tournament.find({ entrants: { $elemMatch: { gamerTag : req.params.gamerTag } } })
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments => {
        if(tournaments && tournaments.length){
        const avgPlacement = Math.round(tournaments.reduce((acc, cur) => {
            return acc += cur.entrants.find(entrant => {
                return entrant.gamerTag.toUpperCase() == req.params.gamerTag.toUpperCase();
            }).placement;
        },0)/tournaments.length);
        switch(true){            
            case (avgPlacement > 1025): res.json({avgPlacement: '1537th'});
            break;            
            case (avgPlacement > 769): res.json({avgPlacement: '1025th'});
            break;            
            case (avgPlacement > 513): res.json({avgPlacement: '769th'});
            break;            
            case (avgPlacement > 385): res.json({avgPlacement: '513th'});
            break;            
            case (avgPlacement > 257): res.json({avgPlacement: '385th'});
            break;            
            case (avgPlacement > 193): res.json({avgPlacement: '257th'});
            break;            
            case (avgPlacement > 129): res.json({avgPlacement: '193rd'});
            break;            
            case (avgPlacement > 97): res.json({avgPlacement: '129th'});
            break;            
            case (avgPlacement > 65): res.json({avgPlacement: '97th'});
            break;            
            case (avgPlacement > 49): res.json({avgPlacement: '65th'});
            break;            
            case (avgPlacement > 33): res.json({avgPlacement: '49th'});
            break;            
            case (avgPlacement > 25): res.json({avgPlacement: '33rd'});
            break;            
            case (avgPlacement > 17): res.json({avgPlacement: '25th'});
            break;            
            case (avgPlacement > 13): res.json({avgPlacement: '17th'});
            break;            
            case (avgPlacement > 9): res.json({avgPlacement: '13th'});
            break;            
            case (avgPlacement > 7): res.json({avgPlacement: '9th'});
            break;            
            case (avgPlacement > 5): res.json({avgPlacement: '7th'});
            break;            
            case (avgPlacement > 4): res.json({avgPlacement: '5th'});
            break;   
            case (avgPlacement == 4): res.json({avgPlacement: '4th'});
            break;                                 
            case (avgPlacement == 3): res.json({avgPlacement: '3rd'});
            break;            
            case (avgPlacement == 2): res.json({avgPlacement: '2nd'});
            break;            
            case (avgPlacement == 1): res.json({avgPlacement: '1st'});                     
        }        
    }
    else{ res.status(404).send('No Tournaments Found For ' + req.params.gamerTag + '.'); } 
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/avgSeed/:gamerTag')
.get((req, res) => {
    schemas.tournament.find({ entrants: { $elemMatch: { gamerTag : req.params.gamerTag } } })
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments => {
        if(tournaments && tournaments.length){
            const avgSeed = Math.round(tournaments.reduce((acc, cur) => {
                return acc += cur.entrants.find(entrant => {
                    return entrant.gamerTag.toUpperCase() == req.params.gamerTag.toUpperCase();
                }).seed;
            },0)/tournaments.length);
            res.json({avgSeed: avgSeed});
        }
        else{ res.status(404).send('No Tournaments Found For ' + req.params.gamerTag + '.'); }         
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});


router.route('/players/lastMet/:player1/:player2')
.get((req, res) => {
    schemas.tournament.find({ entrants: { $all: [{ $elemMatch: { gamerTag : req.params.player1 }}, { $elemMatch: { gamerTag : req.params.player2 }}]}})
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments =>{
        if(tournaments && tournaments.length){
            const playersTournaments = tournaments.filter(tournament => {
                const player1Id = tournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.player1.toUpperCase()).id;
                const player2Id = tournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.player2.toUpperCase()).id;
                return tournament.matches.find(match => {
                    return (match.winnerId == player1Id && match.loserId == player2Id) || (match.loserId == player1Id && match.winnerId == player2Id);
                });                
            });            
            if(playersTournaments.length){
                schemas.tournamentListing.find({ _id: { $in: playersTournaments.map(tournament => tournament._id) }}).sort({eventDate: -1 }).limit(1)
                .then(tournament => {
                    res.json(tournament);
                });
            }
            else{ res.status(404).send('No Matches Found For ' + req.params.player1 + ' and ' + req.params.player2 + '.' ); }                    
        }
        else{ res.status(404).send('No Matches Found For ' + req.params.player1 + ' and ' + req.params.player2 + '.' ); }     
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/matchHistory/:player1/:player2')
.get((req, res) => {    
    schemas.tournament.find({ entrants: { $all: [{ $elemMatch: { gamerTag : req.params.player1 }}, { $elemMatch: { gamerTag : req.params.player2 }}]}})
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments =>{
        if(tournaments && tournaments.length){                        
            let promises = [];  
            tournaments.forEach(tournament => {
                const player1 = tournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.player1.toUpperCase());
                const player2 = tournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.player2.toUpperCase());                                                         
                tournament.matches.forEach( match => {
                    if((match.winnerId == player1.id && match.loserId == player2.id) || (match.loserId == player1.id && match.winnerId == player2.id)){                            
                        promises.push( schemas.tournamentListing.findOne({ _id: tournament._id }).then((details) =>{                            
                            return{                                
                                tournamentName: details.name,
                                shortName: details.shortName,                                
                                title: match.title,
                                date: details.eventDate,
                                player1Score: match.winnerId == player1.id ? match.winnerScore : match.loserScore,
                                player2Score: match.winnerId == player2.id ? match.winnerScore : match.loserScore,
                                bracket: match.bracket,
                                round: match.round,
                                placement: match.placement
                            }
                        }));    
                    }
                });                                       
            });       
            Promise.all(promises)
                .then((matchHistory)=>{
                    if(matchHistory.length) {
                        res.json(matchHistory)            
                    } 
                    else{
                        res.status(404).send('No Matches Found For ' + req.params.player1 + ' and ' + req.params.player2 + '.')
                    }   
                })
                .catch(err =>{
                res.status(500).send("Error: " + err.message);
            });    
        }
        else{ res.status(404).send('No Matches Found For ' + req.params.player1 + ' and ' + req.params.player2 + '.' ); }     
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/records/:player1/:player2')//may not need to pass player's gamer tags back as it is needed to even run this query
.get((req, res) => {
    schemas.tournament.find({ entrants: { $all: [{ $elemMatch: { gamerTag : req.params.player1 }}, { $elemMatch: { gamerTag : req.params.player2 }}]}})
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments =>{
        if(tournaments && tournaments.length){
            let matchFound = false;
            let records = {
                player1: req.params.player1,
                player2: req.params.player2,
                player1GameWins: 0,
                player1SetWins: 0,
                player2GameWins: 0,
                player2SetWins: 0
            };            
            tournaments.forEach(tournament => {
                const player1Id = tournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.player1.toUpperCase()).id;
                const player2Id = tournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.player2.toUpperCase()).id;
                tournament.matches.forEach( match => {
                    if(match.winnerId == player1Id && match.loserId == player2Id){
                        records.player1GameWins += match.winnerScore;
                        records.player2GameWins += match.loserScore;
                        records.player1SetWins++;
                        matchFound = true;
                    } 
                    else if (match.loserId == player1Id && match.winnerId == player2Id){
                        records.player2GameWins += match.winnerScore;
                        records.player1GameWins += match.loserScore;
                        records.player2SetWins++;
                        matchFound = true;
                    }
                });
            });
            matchFound ? res.json(records) : res.status(404).send('No Matches Found For ' + req.params.player1 + ' and ' + req.params.player2 + '.' ); 
        }
        else{ res.status(404).send('No Matches Found For ' + req.params.player1 + ' and ' + req.params.player2 + '.' ); }     
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/highestSet/:player1/:player2')//may not need to pass player's gamer tags back as it is needed to even run this query
.get((req, res) => {
    schemas.tournament.find({ entrants: { $all: [{ $elemMatch: { gamerTag : req.params.player1 }}, { $elemMatch: { gamerTag : req.params.player2 }}]}})
    .lean().collation({locale: "en", strength: 1})
    .then(tournaments =>{
        if(tournaments && tournaments.length){
            let highestTournamentId = null;
            let highestPlacement = Number.MAX_SAFE_INTEGER;
            tournaments.forEach(tournament => {
                const player1Id = tournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.player1.toUpperCase()).id;
                const player2Id = tournament.entrants.find(entrant => entrant.gamerTag.toUpperCase() == req.params.player2.toUpperCase()).id;
                tournament.matches.forEach( match => {
                    if((match.winnerId == player1Id && match.loserId == player2Id) || (match.loserId == player1Id && match.winnerId == player2Id)){
                        if(match.placement < highestPlacement && match.placement){//ignore zeroes caused by resets
                            highestTournamentId = tournament._id;
                            highestPlacement = match.placement;
                        }
                    }              
                });
            });
            if(highestTournamentId) {
                schemas.tournamentListing.findOne({ _id: highestTournamentId })
                .then(tournament => {
                    res.json({tournament: tournament, placement: ordinal(highestPlacement)});
                });                
            } 
            else{
                 res.status(404).send('No Matches Found For ' + req.params.player1 + ' and ' + req.params.player2 + '.')
            }
        }
        else{ res.status(404).send('No Matches Found For ' + req.params.player1 + ' and ' + req.params.player2 + '.' ); }     
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);
    });
});

router.route('/players/powerRankUpdater')
.post((req,res) =>{
    const bulkOps = powerRanks.default.map(player => ({
        updateOne: {
            filter: { gamerTag: player.gamerTag },                                    
            update: {
                $set: { 
                    powerRank: player.powerRank,                                      
                    mains: player.mains,
                    sponsor: player.sponsor                
                }
            },
            upsert: true,
            collation: { locale: 'en', strength: 1}
        }
    }));
    schemas.player.collection.bulkWrite(bulkOps)
    .then(response => {                                                                                          
        res.status(200).send('power ranks updated');
    })
    .catch(err => {
        res.status(500).send("Error: " + err.message);
    });
});

module.exports = router;