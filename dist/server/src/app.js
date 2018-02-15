'use strict';

// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const morgan = require('morgan')
//
// const app = express()
// app.use(morgan('combined'))
// app.use(bodyParser.json())
// app.use(cors())

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/pokedex/');

require('./../models/Pokemon');
//require('./../models/Type')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./../db');

// app.use('/pokemons', require('/routes/pokemons'))
// app.use('/types', require('/routes/types'))
//
// app.use('/' require('./routes'))

app.use('/users', require('./../routes/Users'));
app.use('/pokemons', require('./../routes/pokemons'));

app.listen(process.env.PORT || 8082);
//# sourceMappingURL=app.js.map