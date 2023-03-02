'use strict' ;

const scores = [3, 4, 2, 9, -2, -7, -3, 10] ;

// scores[3] = 7 ;
// scores.push(13);

// scores = [3, 3]

// const better = [...scores] ;

// for(let i=0; i<better.length; i++) {
//     if(better[i]<0) {
//         better.splice(i, 1) ;
//     }
// }

const better = [] ;
for(const value of scores) {
    if (value>=0) {
        better.push(value) ;
    }
}

const NN = scores.length - better.length ;

let minVal = Math.min(...better) ;
let minPos = better.indexOf(minVal) ;
better.splice(minPos, 1) ;

minVal = Math.min(...better) ;
minPos = better.indexOf(minVal) ;
better.splice(minPos, 1) ;

let sum = 0;
for(const value of better) {
    sum += value ;
}
const average = Math.round(sum/better.length);

for(let c=0; c<NN+2; c++) {
    better.push(average) ;
}

console.log(scores) ;
console.log(better) ;