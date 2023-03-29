const express = require('express');
const bodyparser = require('body-parser');

const app = express()

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const database = require('./src/routes/database')
const notes = require('./src/routes/notes')

// route middlewares
app.use("/api",database)
app.use("/api/notes",notes)

app.listen(5000, ()=>{console.log(`Server started in http://localhost:${5000}/`)})