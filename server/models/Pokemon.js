var mongoose = require('mongoose')

//var ToySchema = new Schema({ name: String });

var pokemonSchema = new mongoose.Schema({
    name: {type: String, unique: true, sparse: true},
    type: {
        type: mongoose.Types.objectId,
        ref: 'Type',
    },
    niveau: {type: Number, default: 1},
    img : String,
    evolution: [
    	{
        	niveauEvolution: Number,
        	evolutionId: mongoose.Pokemons.objectId,
        	ref: 'Pokemon',
    	}
    ]
})

var Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = Pokemon
