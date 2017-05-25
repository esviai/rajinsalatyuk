const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

var index = require('./routes/index')

app.use('/', index)

app.listen(3000)
