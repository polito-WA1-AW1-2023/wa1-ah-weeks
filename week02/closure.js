'use strict' ;

function powerize(exponent) {

    const powexp = (base) => Math.pow(base, exponent) ;

    return powexp ;

}

const square = powerize(2) ;
const cube = powerize(3) ;
const root = powerize(0.5) ;

for(let n=1; n<10; n++) {
    console.log(n, square(n), cube(n), root(n)) ;
}