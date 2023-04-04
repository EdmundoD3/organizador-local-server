const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express()

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// import routes
const authRoutes = require('./routes/auth');
const notes = require('./routes/notes')
// const verifyToken = require('./routes/validate-token');

// route middlewares
app.use('/api/auth', authRoutes);
app.use("/api/notes",notes)

module.exports = app