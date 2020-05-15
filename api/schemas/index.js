let db = {};

// load schemas
const schemas = [
    'article',
    'player',
    'tournament',    
    'tournamentListing'
];

schemas.forEach(file => {
    const schema = require('./' + file);
    db[file] = schema;
});

module.exports = db;