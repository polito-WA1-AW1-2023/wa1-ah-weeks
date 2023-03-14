'use strict';

const sqlite = require('sqlite3') ;

const db = new sqlite.Database('questions.sqlite', (err)=>{
    if(err) throw err ;
}) ;

const questNo = 1 ;


function authorsOfQuestionNumber(qestNo) {
    return new Promise((resolve,reject)=>{
        const sql = `SELECT author FROM answer WHERE questionId = ?` ;

        db.all(sql, [questNo], (err, rows)=>{
            if(err) 
                throw err ;
            else {
                const authorList = rows.map((item)=>item['author']) ;
                resolve(authorList) ;
            }
        }) ;
        
    }) ;
}

const myAuthors = authorsOfQuestionNumber(1) ;

myAuthors.then((list)=>{console.log(list)})



