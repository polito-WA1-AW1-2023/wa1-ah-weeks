'use strict' ;
const sqlite = require('sqlite3');


const db = new sqlite.Database('questions.sqlite', (err) => {
    if (err) throw err;
});

exports.db = db ;