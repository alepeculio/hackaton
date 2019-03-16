const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const cupon = require('./routes/cupon.route');
const coso = require( './controllers/cupon.controller' );
const app = express();

var mongoose = require('mongoose');
var deb_db_url = 'mongodb://hackaton:hackaton2019@ds331735.mlab.com:31735/hackaton';

var mongoDB = deb_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use('/cupones', cupon);
let port = 1234;
//Para usar un template
//npm install --save ejs

'use strict';


const server = app.listen( process.env.PORT || port, () => {
	console.log('Servidor iniciado');
});