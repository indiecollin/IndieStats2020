const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({  
  name: String,
  thumbnail: String,
  abstract: String,
  markdown: String,
  date: Date,
  tags: String  
});

module.exports = mongoose.model('article', articleSchema);