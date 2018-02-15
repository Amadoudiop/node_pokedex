var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: {type: String, unique: true, sparse: true, required: true},
    email: {type: String, unique: true, sparse: true, required: true},
    password: {type: String, required: true},
    pokemonsCaptures: [Number]
})

var User = mongoose.model('User', userSchema)

module.exports = User
