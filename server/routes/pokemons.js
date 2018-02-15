const express = require('express')
// const _ = require('lodash')
const Pokemon = require('../models/Pokemon')
const errorManager = require('../helpers/request-api-error')

const router = express.Router()

const getPokemons = (req, res) => {
    Pokemon.find()
        .then(result => res.json(result))
        .catch(err => errorManager.error500(res, err))
}

const getPokemon = (req, res) => {
    Pokemon.findById(req.params.id, (err, Pokemon) => {
        if (err) {
            res.status(500).send(err)
        }
        if (Pokemon) {
            res.status(200).send(Pokemon)
        } else {
            res.status(404).send("No Pokemon found with that ID")
        }
    });
}

const createPokemon = (req, res) => {
    const p = req.body
    if(req) console.log(req.body)
    const newPokemon = new Pokemon(p)
    newPokemon.save().then((Pokemon) => {
        res.json(Pokemon)
    }).catch(err => errorManager.error500(res, err))
}

const editPokemon = (req, res) => {
    Pokemon.findById(req.params.id, (err, Pokemon) => {
        if (err) {
            res.status(500).send(err);
        } else {
            Pokemon.name = req.body.name || Pokemon.name;
            Pokemon.type = req.body.type || Pokemon.type;
            Pokemon.niveau = req.body.niveau || Pokemon.niveau;
            Pokemon.img = req.body.img || Pokemon.img;
            console.log(typeof Pokemon.evolution);
            if(req.body.evolution) Pokemon.evolution = [ ];
            Pokemon.evolution = req.body.evolution || Pokemon.evolution ;

            Pokemon.save((err, pokemon) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(200).send(pokemon);
            });
        }
    })
}

const deletePokemon = (req, res) => {
    Pokemon.findByIdAndRemove(req.params.id, (err, Pokemon) => {
        let response = {
            message: "Pokemon successfully deleted",
            id: Pokemon._id
        };
        res.status(200).send(response);
    });
}


router.get('/', getPokemons)
router.get('/:id', getPokemon)
router.post('/', createPokemon)
router.put('/:id',  editPokemon)
router.patch('/:id',  editPokemon)
router.delete('/:id', deletePokemon)

module.exports = router