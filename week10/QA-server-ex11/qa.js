'use strict' ;

const dayjs = require('dayjs');

function Answer(id, text, author, score, date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.score = score;
    this.date = dayjs(date);

    this.toString = () => this.text +  ' by ' + this.author ;
}

function Question(id, text, author, date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.date = dayjs(date);
}

exports.Answer = Answer ;
exports.Question = Question ;