//Init express and body parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const env = require('dotenv').config();

//Declare route const
const index = require('./routes/index');

//Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

//Routing
app.use('/',index)

//Listening to port 3000
app.listen(3000)