'use strict';

const { Question, Answer } = require('./qa');

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('questions.sqlite', (err) => {
    if (err) throw err;
});

function readQuestion(id) {
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

function createQuestion(question) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO question(text, author, date) VALUES(?,?,?)';
        // NOTE: question.id is ignored because the database will generate an auto-incremental ID
        db.run(sql, [question.text, question.author, question.date.toISOString()], (err) => {
            if (err)
                reject(err.message);
            else
                resolve(true);
        });

    });
}

function listQuestions() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM question';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else {
                const questions = rows.map((q) => new Question(q.id, q.text, q.author, dayjs(q.date)));
                resolve(questions);
            }
        });
    });
}


function listAnswers(questionId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM answer WHERE questionId = ?';
        db.all(sql, [questionId], (err, rows) => {
            if (err)
                reject(err)
            else {
                const answers = rows.map((a) => new Answer(a.id, a.text, a.author, a.score, a.date));
                resolve(answers);
            }
        });
    });
}

function createAnswer(questionId, answer) {
    // NOTE: answer.id is ignored because the database will generate an auto-incremental ID
    // NOTE: answer.score is ignored and forced to ZERO
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO ANSWER(text, author, date, score, questionId) VALUES (?,?,?,0,?)';
        db.run(sql, [answer.text, answer.author, answer.date.toISOString(), questionId], (err) => {
            if (err) reject(err)
            else resolve(true);
        });
    });
}

function deleteAnswer(answerId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM answer WHERE id=?';
        db.run(sql, [answerId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    })
}

function updateAnswer(answerId, answer) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE answer
        SET text=?, author=?, date=?, score=0
        WHERE id=?` ;

        db.run(sql, [answer.text, answer.author, answer.date.toISOString(), answerId], (err)=>{
            if(err) {
                reject(err) ;
            } else {
                resolve(true) ;
            }
        }) ;
    })
}

exports.upVoteAnswer = function(answerId) {
    return new Promise((resolve, reject)=>{
        const sql = `UPDATE answer SET score=score+1 WHERE id=?` ;
        
        db.run(sql, [answerId], (err)=>{
            if(err) {
                reject(err);
            } else {
                resolve(true) ;
            }
        }) ;
    });
}

exports.readAnswer = function(answerId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM answer WHERE id=?';
        db.all(sql, [answerId], (err, rows) => {
            if (err)
                reject(err)
            else {
                const answers = rows.map((a) => new Answer(a.id, a.text, a.author, a.score, a.date, a.questionId));
                resolve(answers[0]);
            }
        });
    });
}

exports.listQuestions = listQuestions;
exports.readQuestion = readQuestion;
exports.createQuestion = createQuestion;
exports.listAnswers = listAnswers;
exports.createAnswer = createAnswer;
exports.deleteAnswer = deleteAnswer;
exports.updateAnswer = updateAnswer ;