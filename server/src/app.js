// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const morgan = require('morgan')
//
// const app = express()
// app.use(morgan('combined'))
// app.use(bodyParser.json())
// app.use(cors())

var express = require('express')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/pokedex/')

require('models/Pokemon')
require('models/Type')

var app = express()

app.use('/pokemons', require.('/routes/pokemons'))
app.use('/types', require.('/routes/types'))

app.use('/' require('./routes'))

app.listen(process.env.PORT || 8082)