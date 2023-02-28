"use strict" ;

a = 'abc'

console.log(a)
var a = 3
console.log(a)

for(let i = 0; i<10; i++) {
    console.log(i);
}

let seq = [1,2,3, "aaa", "222", [2, 2]]
console.log(seq)
console.log(seq.length)

for(let i=0; i<seq.length; i++) {
    console.log(seq[i])
}

for(const element of seq) {
    console.log(element)
}