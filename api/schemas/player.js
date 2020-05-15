const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({  
    gamerTag: {
        type: String, index: {unique: true}
    },
    setWins: Number,
    setLosses: Number,
    gameWins: Number,
    gameLosses: Number,
    powerRank: Number,
    mains: String,
    sponsor: String,
    icon: Number,
    iconColor: Number,
    badgeColor: Number
}, { collation: { locale: 'en_US', strength: 1 } }
);

module.exports = mongoose.model('player', playerSchema);