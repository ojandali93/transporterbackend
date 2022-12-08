const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const logger = require('logger');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');
const axios = require('axios')

const router = require('../../../Router')

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.get('/calcroute', (req, res) => {
  let queryURL = 'https://maps.googleapis.com/maps/api/directions/json?' + 
    'alternatives=true&' +
    'mode=transit&' +
    `unitSystem=${req.query.unitSystem}&` +
    `avoidFerries=${req.query.avoidFerries}&` +
    `optimizeWaypoints=${req.query.optimizeWaypoints}&` +
    `origin=${req.query.origin}&` +
    `destination=${req.query.destination}&` +
    `key=AIzaSyDzr5JW4micTzRKefLE4iBm7nge5REsZ7E&` 

  var config = {
    method: 'get',
    url: queryURL,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    // console.log((response.data));
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
    res.send('unsuccessfull request').statusCode(400)
  });
})

module.exports = app;