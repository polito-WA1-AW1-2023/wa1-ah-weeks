'use strict';

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('questions.sqlite', (err) => {
    if (err) throw err;
});

function QuestionList() {

    this.getQuestion = function (id) {

        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM question WHERE id = ?';
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Question(row.id, row.text, row.author, row.date));
                }
            });
        });
    }

    this.addQuestion = function(question) {
        return new Promise((resolve, reject)=> {
            const sql = 'INSERT INTO question(id, text, author, date) VALUES(?,?,?,?)' ;
            db.run(sql, [question.id, question.text, question.author, question.date.toISOString()], (err)=>{
                if(err)
                    reject(err);
                else
                    resolve(true);
            }) ;

        });
    }

}

function Answer(id, text, author, score, date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.score = score;
    this.date = dayjs(date);
}

function Question(id, text, author, date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.date = dayjs(date);

    this.getAnswers = function() {
        return new Promise((resolve, reject)=>{
            const sql = 'SELECT * FROM answer WHERE questionId = ?' ;
            db.all(sql, [this.id], (err,rows)=>{
                if(err)
                    reject(err)
                else {
                    const answers = rows.map((a)=>new Answer(a.id, a.text, a.author, a. score, a.date)) ;
                    resolve(answers) ;
                }
            });
        }) ;
    }

    this.getAnswers2 = async function() {

    }
}

const ql = new QuestionList();

ql.getQuestion(1).then((question)=>{
    console.log(question);
    question.getAnswers().then((answers)=>{console.log(answers)}) ;
})

async function query() {
    try {
        const question = await ql.getQuestion(1);
        const answers = await ql.getAnswers(question) ;
        return answers ;
    } catch(e) {

    }
}

query().then((answsers)=>{})

const answers2 = await query() ;

const answers3 = query() ;


ql.getQuestion(2)
    .then(question=>question.getAnswers())
    .then(answers=>console.log(`We have ${answers.length} anwsers`)) ;

ql.addQuestion(new Question(3, 'How are you?', 'Fulvio', '2023-03-14'));



debugger;