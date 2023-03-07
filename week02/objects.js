'use strict' ;

// const response = { text: 'abcabacba', score: 5}

function createResponse(text, score) {
    const obj = {
        text: text,
        score: score
    }

    obj.increaseScore = () => {obj.score = obj.score+1}

    return obj;
}

const r1 = createResponse('abc', 3);
const r2 = createResponse('xyz', 2);
// console.log(r1, r2);
r1.increaseScore() ;
// console.log(r1, r2);


/// DO THE SAME USING "CONSTRUCTOR FUNCTIONS"

function Response(text, score) {
    this.text = text ;
    this.score = score ;
    this.increaseScore = ()=> {this.score++;};
}

const r3 = new Response('sss', 1);
console.log(r3);
r3.increaseScore();
console.log(r3);

const responses = [r1, r2, r3] ;

responses.sort( (a,b) => b.score-a.score )

// console.log(responses) ;

// const scores=[] ;

responses.forEach((r,i) => {
    console.log(`${i+1} - Response ${r.text} has score ${r.score}`) ;
    // scores.push(r.score);
}) ;

const scores = responses.map( r => r.score ) ;
console.log(scores);

const total = scores.reduce((s,c)=>(s+c), '');
console.log(total)
