'use strict' ;

const PORT=3001

const express = require('express') ;
const app = express() ;
app.use(express.static('public'))

app.listen(PORT, ()=>{console.log(`simple-client started on http://localhost:${PORT}/`)})