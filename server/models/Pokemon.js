var mongoose = require('mongoose')

//var ToySchema = new Schema({ name: String });

var pokemonSchema = new mongoose.Schema({
    name: {type: String, unique: true, sparse: true, required: true},
    type: {
        type: String //mongoose.Types.objectId,
        //ref: 'Type',
    },
    niveau: {type: Number, default: 1, required: true},
    img : {type: String, required: true},
    evolution: [
    	{
        	niveauEvolution: Number,
        	evolutionName: String
    	}
    ]
})

var Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = Pokemon
