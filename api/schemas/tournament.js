const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  entrants:[{    
    id: Number,
    gamerTag: String,
    seed: Number,
    placement: Number,
    matches: String
  }],
  matches: [{        
    winnerId: Number,
    loserId: Number,
    winnerScore: Number,
    loserScore: Number,
    placement: Number,
    round: Number,
    bracket: Boolean
  }]
});

module.exports = mongoose.model('tournament', tournamentSchema);
