// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const morgan = require('morgan')
//
// const app = express()
// app.use(morgan('combined'))
// app.use(bodyParser.json())
// app.use(cors())

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/pokedex/')

require('./../models/Pokemon')
//require('./../models/Type')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./../db')

// app.use('/pokemons', require('/routes/pokemons'))
// app.use('/types', require('/routes/types'))
//
// app.use('/' require('./routes'))

app.use('/users', require('./../routes/Users'))
app.use('/pokemons', require('./../routes/pokemons'))

app.listen(process.env.PORT || 8082)