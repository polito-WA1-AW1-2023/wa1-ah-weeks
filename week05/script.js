'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    // const helloTitle = document.getElementsByTagName("h1")[0] ;
    const helloTitle = document.getElementById('titleheading');
    helloTitle.innerText = 'Hola';

    helloTitle.addEventListener('click', (event)=>{
        // const list = document.getElementsByTagName('ol')[0] ;
        const list = document.querySelector('ol') ;
        console.log(list) ;

        const row = document.createElement('li') ;
        row.innerText = "I am new" ;
        list.appendChild(row) ;
    }) ;
});

