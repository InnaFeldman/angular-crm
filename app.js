const express = require('express'); //connect express into the file

//To handle HTTP POST request we need to install middleware module called body-parser. 
//It parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
const bodyParser = require('body-parser'); 
const cors = require('cors'); // If our client is an another domain
const morgan = require('morgan');// To see what happend to server currently
const mongoose = require('mongoose');
const authRouts = require('./routs/auth');
const analyticsRouts = require('./routs/analytic');
const categoryRouts = require('./routs/category');
const orderRouts = require('./routs/order');
const positionRouts = require('./routs/position');
const keys = require('./config/keys');
const app = express(); //Create a copy of framework express

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true })
mongoose.createConnection(keys.mongoURI, { useNewUrlParser: true })
.then(()=> console.log("MongoDb connected"))
.catch(error => console.log(error))

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); //Protects url adress from unappropriated symbols
app.use(bodyParser.json()); //For generating js object from jsom that we recive.

///Rout registration
app.use('/api/auth', authRouts);
app.use('/api/analytics', analyticsRouts);
app.use('/api/category', categoryRouts);
app.use('/api/order', orderRouts);
app.use('/api/position', positionRouts);

module.exports = app;