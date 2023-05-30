'use strict' ;
const sqlite = require('sqlite3');


const db = new sqlite.Database('questions.sqlite', (err) => {
    if (err) throw err;
});

module.exports = db ; // a 'default export' in nodejs conventions