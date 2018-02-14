var router = require('express').Router()

var Pokemon = require('./models/pokemon')
var Type = require('./models/Types')

router.get('/pokemons', (req, res) => {
    Pokemon.find({}).populate('types')
    .then(pokemons => {
        res.render()
    })
})

router.get('/pokemon/new', (req, res) => {
    Type.find({}).then.types => {
        var pokemon = new Pokemon()
        res.render()
    }
})

router.get('/pokemon/:id/edit', (req, res) => {
    Type.find({}).then.types => {
        Pokemon.findById(req.params.id)
            .populate('types')
            .then(pokemon => {
            res.render()
        })
    },
    err => res.status(500).send(err)
})

router.get('/pokemon/:id', (req, res) => {
    Pokemon.findById(req.params.id)
    .populate('types')
    .then(pokemon => {
        res.render()
    },
    err => res.status(500).send(err)
})

module.exports = router