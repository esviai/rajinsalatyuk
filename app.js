const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rajinsalatyuk');

const index = require('./routes/index');
const users = require('./routes/users');
const locations = require('./routes/locations');
const locationusers = require('./routes/locationusers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/', index);
app.use('/users', users);
app.use('/locations', locations);
app.use('/locationusers', locationusers);

app.listen(3000);
