'use strict';

var express = require('express');
// const _ = require('lodash')
var User = require('../models/user');
var encrypter = require('../services/encrypter');
var errorManager = require('../helpers/request-api-error');
var passwordGenerator = require('../services/password-generator');

var router = express.Router();

var getUsers = function getUsers(req, res) {
    User.find().then(function (result) {
        return res.json(result);
    }).catch(function (err) {
        return errorManager.error500(res, err);
    });
};

var getUser = function getUser(req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).send(err);
        }
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("No user found with that ID");
        }
    });
};

var createUser = function createUser(req, res) {
    var p = req.body;
    if (req) console.log(req.body);
    var password = passwordGenerator.generatePassword(10);
    p.password = encrypter.encrypt(password);
    var newUser = new User(p);
    newUser.save().then(function (user) {
        res.json(user);
    }).catch(function (err) {
        return errorManager.error500(res, err);
    });
};

var editUser = function editUser(req, res) {
    User.findById(req.params.id, function (err, User) {
        if (err) {
            res.status(500).send(err);
        } else {
            User.name = req.body.name || user.name;
            User.email = req.body.email || user.email;
            User.password = req.body.password || user.password;

            User.save(function (err, pokemon) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(pokemon);
            });
        }
    });
};

var deleteUser = function deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        var response = {
            message: "User successfully deleted",
            id: user._id
        };
        res.status(200).send(response);
    });
};

var addPokemonToUser = function addPokemonToUser(req, res) {
    var p = req.body;
    User.findById(req.params.id, function (err, User) {
        if (err) {
            res.status(500).send(err);
        } else {
            User.pokemonsCapture.push(req.body.pokemonsCapture);
            User.save(function (err, pokemon) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(pokemon);
            });
        }
    }).catch(function (err) {
        return errorManager.error500(res, err);
    });
};

var getPokemonsUser = function getPokemonsUser(req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).send(err);
        }
        if (user) {
            res.status(200).send(user.pokemonsCapture);
        } else {
            res.status(404).send("No pokemon found with that ID");
        }
    });
};
var getPokemonUser = function getPokemonUser(req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).send(err);
        }
        if (user) {
            res.status(200).send(user.pokemonsCapture.filter(function (pokemonCapture) {
                return pokemonCapture._id == req.params.idpokemon;
            }));
        } else {
            res.status(404).send("No pokemon found with that ID");
        }
    });
};

var patchPokemonUser = function patchPokemonUser(req, res) {
    User.findById(req.params.id, function (err, user) {
        console.log(req.body);
        if (err) {
            res.status(500).send(err);
        }
        if (user) {
            var pokemonToChange = user.pokemonsCapture.filter(function (pokemonCapture) {
                return pokemonCapture._id == req.params.idpokemon;
            });
            pokemonToChange[0].pokemonName = req.body.pokemonName || pokemonToChange[0].pokemonName;
            pokemonToChange[0].pokemonType = req.body.pokemonType || pokemonToChange[0].pokemonType;
            pokemonToChange[0].niveau = req.body.niveau || pokemonToChange[0].niveau;
            pokemonToChange[0].img = req.body.img || pokemonToChange[0].img;

            user.save(function (err, user) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(user);
            });
        } else {
            res.status(404).send("No pokemon found with that ID");
        }
    });
};

var deletePokemonUser = function deletePokemonUser(req, res) {
    User.findById(req.params.id, function (err, user) {
        console.log(req.body);
        if (err) {
            res.status(500).send(err);
        }
        if (user) {
            var indexPokemon = user.pokemonsCapture.findIndex(function (pokemonCapture) {
                return pokemonCapture._id == req.params.idpokemon;
            });
            delete user.pokemonsCapture[indexPokemon];
            // pokemonToChange[0].pokemonName = req.body.pokemonName || pokemonToChange[0].pokemonName;
            // pokemonToChange[0].pokemonType = req.body.pokemonType || pokemonToChange[0].pokemonType;
            // pokemonToChange[0].niveau = req.body.niveau || pokemonToChange[0].niveau;
            // pokemonToChange[0].img = req.body.img || pokemonToChange[0].img;

            user.save(function (err, user) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(user);
            });
        } else {
            res.status(404).send("No pokemon found with that ID");
        }
    });
};

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);
router.post('/:id/addPokemon', addPokemonToUser);
router.get('/:id/pokemons', getPokemonsUser);
router.get('/:id/pokemons/:idpokemon', getPokemonUser);
router.patch('/:id/pokemons/:idpokemon', patchPokemonUser);
router.delete('/:id/pokemons/:idpokemon', deletePokemonUser);

module.exports = router;
//# sourceMappingURL=Users.js.map