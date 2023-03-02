'use strict' ;

const names = "Luigi De Russis, Luca    Mannella, Fulvio Corno, Juan   Pablo Saenz Moreno, Enrico   Masala, Antonio Servetti, Eros Fani" ;

const nameArray = names.split(',') ;

for(let i =0 ; i<nameArray.length; i++)
    nameArray[i] = nameArray[i].trim();

// for(let value of nameArray) {
//     value = value.trim() ;
// }

const acronyms = [] ;

for(const name of nameArray) {
    const words = name.split(' ') ;
    // console.log(words) ;
    let initials = '' ;
    for(const word of words) {
        if (word) {
            initials = initials + word[0] ;
        }
    }
    acronyms.push(initials) ;
}

// console.log(nameArray) ;
// console.log(acronyms) ;

for(let i=0; i<nameArray.length; i++) {
    console.log(`${acronyms[i]} - ${nameArray[i]}`) ;
}