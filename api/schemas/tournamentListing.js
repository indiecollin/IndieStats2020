const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentListingSchema = new Schema({  
  name: String,
  shortName: String,
  entrantCount: Number,
  bracketHost: String,
  bracketLink: String,
  featured: Boolean,
  eventDate: Date,
  venue: String,
  series: String,
  season: String,
  eventPage: String
});

module.exports = mongoose.model('tournamentListing', tournamentListingSchema);
