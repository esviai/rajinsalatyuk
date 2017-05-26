//Init express and body parser
const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rajinsalatyuk');

const index = require('./routes/index');
const users = require('./routes/users');
const locations = require('./routes/locations');
const locationusers = require('./routes/locationusers');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/locations', locations);
app.use('/locationusers', locationusers);

app.listen(3000);
