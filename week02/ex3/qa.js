'use strict';

const dayjs = require('dayjs') ;

function Answer(text, author, score, date) {
    this.text = text ;
    this.author = author ;
    this.score = score ;
    this.date = dayjs(date) ;
}

function Question(text, author, date) {
    this.text = text ;
    this.author = author ;
    this.date = dayjs(date) ;
    this.answers = [] ;

    this.add = function(answer) {this.answers.push(answer); }

    this.findAll = function(author) { 
        return this.answers.filter((a)=>(a.author==author)) ;
    }

    // this.findAll = author => this.answers.filter((a)=>(a.author==author)) 

    this.afterDate = (limitDate) => 
        this.answers.filter(
            answer => answer.date.isAfter(dayjs(limitDate))
        ) ;

    this.listByScore = () => {
        const answersCopy = [...this.answers] ;
        answersCopy.sort((a,b)=>b.score-a.score)
        return answersCopy ;
    }
}

const q1 = new Question('What day is it?', 'Fulvio', '2023-03-07') ;

q1.add(new Answer('Tuesday', 'CleverGuy', 0, '2023-03-07')) ;

console.log(q1);
console.log(q1.findAll('CleverGuy')) ;
console.log(q1.findAll('OtherGuy')) ;

console.log(q1.afterDate('2023-01-01')) ;
console.log(q1.afterDate('2023-06-01')) ;

debugger ;