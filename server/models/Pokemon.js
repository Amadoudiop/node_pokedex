var mongoose = require('mongoose')

var pokemonSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    picture : String,
    type: {
        type: mongoose.Types.objectId,
        ref: 'Type',
    }
})

var Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = Pokemon
