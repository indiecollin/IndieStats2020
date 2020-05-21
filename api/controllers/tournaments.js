const schemas = require('../schemas');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSWD}@localhost:27017/IndieStats`, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

router.route('/tournaments/events')
.get((req,res) => {         
    let tournamentQuery = {};
    if(req.query.players){        
        const players = decodeURI(req.query.players).split(',').map(player => ({$elemMatch: {gamerTag: player.trim()}}))        
        tournamentQuery = { entrants: { $all: players }};
    }        
    schemas.tournament.find(tournamentQuery).lean().collation({locale: "en", strength: 1})
    .then(tournaments => {        
        let tournamentList = {tournaments: []};
        let tournamentListQuery = {_id: { $in: tournaments.map(tournament => tournament._id) }};
        tournamentListQuery.entrantCount = { $exists: true };
        if(req.query.startDate && req.query.endDate){
            tournamentListQuery.$and = [{eventDate: {$gte: new Date(+req.query.startDate)}}, {eventDate: {$lte: new Date(+req.query.endDate)}}];
        }
        else if(req.query.startDate){ tournamentListQuery.eventDate = {$gte: new Date(+req.query.startDate)};}
        else if(req.query.endDate){tournamentListQuery.eventDate = {$lte: new Date(+req.query.endDate)};}            
        if(req.query.search){ tournamentListQuery.$or = [{name: {$regex: new RegExp(decodeURI(req.query.search), 'i')}}, {shortName: {$regex: new RegExp(decodeURI(req.query.search), 'i')}}];}           
        if(req.query.lastTournament){ tournamentListQuery._id = {$gt: req.query.lastTournament} }        
        schemas.tournamentListing.find(tournamentListQuery).sort({'_id': 1}).limit(req.query.count ? parseInt(req.query.count): 0).lean()
        .then(tournamentListings => {                
            tournamentListings.forEach(tournamentListing => {                    
                const curTournament = tournaments.find(tournament => {return tournament._id.toString() == tournamentListing._id.toString();});                
                tournamentListing.topPlacements = curTournament.entrants.sort((entrant1, entrant2) => entrant1.placement - entrant2.placement).slice(0, 3);
                tournamentListing.topSeeds = curTournament.entrants.sort((entrant1, entrant2) => entrant1.seed - entrant2.seed).slice(0, 5);;
                tournamentList.tournaments.push(tournamentListing);                    
            });                
            res.json(tournamentList);
        }).catch(err =>{
            res.status(500).send("Error: " + err.message);
        });
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);        
    });        
});

router.route('/tournaments/listings')
.get((req,res) => {             
    let tournamentListQuery = {};
    if(req.query.startDate && req.query.endDate){
        tournamentListQuery.$and = [{eventDate: {$gte: new Date(+req.query.startDate)}}, {eventDate: {$lte: new Date(+req.query.endDate)}}];
    }
    else if(req.query.startDate){ tournamentListQuery.eventDate = {$gte: new Date(+req.query.startDate)};}
    else if(req.query.endDate){tournamentListQuery.eventDate = {$lte: new Date(+req.query.endDate)};}            
    if(req.query.search){ tournamentListQuery.$or = [{name: {$regex: new RegExp(req.query.search, 'i')}}, {shortName: {$regex: new RegExp(req.query.search, 'i')}}];}            
    schemas.tournamentListing.find(tournamentListQuery).limit(req.query.count ? parseInt(req.query.count): 0).lean()
    .then(tournamentListings => {
        if(tournamentListings){res.json(tournamentListings);}
        else{ res.status(404).send('Error Retrieving Tournaments.'); }                
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);        
    });
});

router.route('/tournaments/players/:id')//may need to return name here
.get((req,res) => {                           
    schemas.tournament.findOne({ _id: req.params.id}).lean().collation({locale: "en", strength: 1})
    .then(tournament =>{        
        if(tournament){
            const players = tournament.entrants.map((entrant, i, entrants) => {
                const matches = tournament.matches.filter(match => (match.winnerId == entrant.id || match.loserId == entrant.id));
                const winnersLoss = matches.find(match => match.loserId == entrant.id && match.bracket);   
                //if losers bracket or GF coming from losers side (placement: 1:GF, 0:GFR)             
                const losersLoss = matches.find(match => match.loserId == entrant.id && (!match.bracket || (match.placement < 2 && matches.filter(match => match.loserId == entrant.id).length == 2) && matches.every(m => match.placement <= m.placement)));
                entrant.wins = matches.filter(match => match.winnerId == entrant.id).length;
                entrant.losses = matches.filter(match => match.loserId == entrant.id).length;
                entrant.loser = winnersLoss ? entrants.find(entrant => entrant.id == winnersLoss.winnerId).gamerTag : null;
                entrant.eliminator = losersLoss ? entrants.find(entrant => entrant.id == losersLoss.winnerId).gamerTag : null;
                return entrant;
            });
            res.json({players: players});        
        }
        else{ res.status(404).send('No Tournament Found.'); } 
    }).catch(err =>{
        res.status(500).send("Error: " + err.message);        
    });    
});

module.exports = router;