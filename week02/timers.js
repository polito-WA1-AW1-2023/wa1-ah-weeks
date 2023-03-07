'use strict';
let a = 33

setTimeout( ()=>{
    console.log(1) ;
    a = 44 ;
    setTimeout( ()=>{console.log(3)}, 2000 ) ;
}, 1000) ;

console.log(a)

setTimeout( ()=>{console.log(4, a)}, 2000 ) ;

console.log(2);
console.log(a)
