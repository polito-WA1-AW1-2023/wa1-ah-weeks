'use strict' ;

const express = require('express') ;
const morgan = require('morgan') ;

const app = express() ;
app.use(morgan());
app.use(express.json());

// const logging = (req,res,next) => {
//     console.log(req.method + ' ' + req.path) ;
//     next() ;
// }

// app.use(logging) ;

app.get('/', (req, res) => {
    const lang = req.query.lang ;
    if(lang && lang==='IT') {
        res.send('Buongiorno!') ;
    } else {
         res.send('Hello there!') ;
    }
}) ;

app.post('/add/:container', (req,res) => {
    const container = req.params.container ;
    console.log('adding to container number '+ container)
    console.log(req.body.id);
    console.log(req.body.name);
    res.end();
});


app.get('/info', (req,res)=>{

    const info = { name: 'xyz', values:[3,6,8]}

    res.json(info) ;

}) ;


app.listen(3000, ()=>{console.log("Server started")}) ;