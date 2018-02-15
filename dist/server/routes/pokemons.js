'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var express = require('express');
// const _ = require('lodash')
var Pokemon = require('../models/Pokemon');
var errorManager = require('../helpers/request-api-error');

var router = express.Router();

var getPokemons = function getPokemons(req, res) {
    Pokemon.find().then(function (result) {
        return res.json(result);
    }).catch(function (err) {
        return errorManager.error500(res, err);
    });
};

var getPokemon = function getPokemon(req, res) {
    Pokemon.findById(req.params.id, function (err, Pokemon) {
        if (err) {
            res.status(500).send(err);
        }
        if (Pokemon) {
            res.status(200).send(Pokemon);
        } else {
            res.status(404).send("No Pokemon found with that ID");
        }
    });
};

var createPokemon = function createPokemon(req, res) {
    var p = req.body;
    if (req) console.log(req.body);
    var newPokemon = new Pokemon(p);
    newPokemon.save().then(function (Pokemon) {
        res.json(Pokemon);
    }).catch(function (err) {
        return errorManager.error500(res, err);
    });
};

var editPokemon = function editPokemon(req, res) {
    Pokemon.findById(req.params.id, function (err, Pokemon) {
        if (err) {
            res.status(500).send(err);
        } else {
            Pokemon.name = req.body.name || Pokemon.name;
            Pokemon.type = req.body.type || Pokemon.type;
            Pokemon.niveau = req.body.niveau || Pokemon.niveau;
            Pokemon.img = req.body.img || Pokemon.img;
            console.log(_typeof(Pokemon.evolution));
            if (req.body.evolution) Pokemon.evolution = [];
            Pokemon.evolution = req.body.evolution || Pokemon.evolution;

            Pokemon.save(function (err, pokemon) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(pokemon);
            });
        }
    });
};

var deletePokemon = function deletePokemon(req, res) {
    Pokemon.findByIdAndRemove(req.params.id, function (err, Pokemon) {
        var response = {
            message: "Pokemon successfully deleted",
            id: Pokemon._id
        };
        res.status(200).send(response);
    });
};

router.get('/', getPokemons);
router.get('/:id', getPokemon);
router.post('/', createPokemon);
router.put('/:id', editPokemon);
router.patch('/:id', editPokemon);
router.delete('/:id', deletePokemon);

module.exports = router;
//# sourceMappingURL=pokemons.js.map