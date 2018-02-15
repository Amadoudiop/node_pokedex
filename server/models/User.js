var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: {type: String, unique: true, sparse: true},
    email: {type: String, unique: true, sparse: true},
    password: {type: String, required: true},
    pokemonsCaptures: [
    	{
        	niveauEvolution: Number,
        	evolutionId: mongoose.Pokemons.objectId,
        	ref: 'Pokemon',
    	}
    ]
})

var User = mongoose.model('User', userSchema)

module.exports = User
