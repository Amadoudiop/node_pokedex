const mongoose = require('mongoose')

const Schema = mongoose.Schema
//const mongoosePaginate = require('mongoose-paginate')

const userSchema = new Schema({
        email: { type: String, required: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        pokemonsCapture: [{
                pokemonName: { type: String },
                pokemonType: { type: String },
                niveau: { type: Number },
                img: { type: String }
        }]
    },
    {
        timestamps: true,
    })

//userSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('User', userSchema)
