const express = require('express')
// const _ = require('lodash')
const User = require('../models/user')
const encrypter = require('../services/encrypter')
const errorManager = require('../helpers/request-api-error')
const passwordGenerator = require('../services/password-generator')

const router = express.Router()

const getUsers = (req, res) => {
    User.find()
        .then(result => res.json(result))
        .catch(err => errorManager.error500(res, err))
}

const getUser = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(500).send(err)
        }
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send("No user found with that ID")
        }
    });
}

const createUser = (req, res) => {
    const p = req.body
    if(req) console.log(req.body)
    const password = passwordGenerator.generatePassword(10)
    p.password = encrypter.encrypt(password)
    const newUser = new User(p)
    newUser.save().then((user) => {
        res.json(user)
    }).catch(err => errorManager.error500(res, err))
}

const editUser = (req, res) => {
    User.findById(req.params.id, (err, User) => {
        if (err) {
            res.status(500).send(err);
        } else {
            User.name = req.body.name || user.name;
            User.email = req.body.email || user.email;
            User.password = req.body.password || user.password;

            User.save((err, pokemon) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(200).send(pokemon);
            });
        }
    })
}

const deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        let response = {
            message: "User successfully deleted",
            id: user._id
        };
        res.status(200).send(response);
    });
}

const addPokemonToUser = (req, res) => {
    const p = req.body
    User.findById(req.params.id, (err, User) => {
        if (err) {
            res.status(500).send(err);
        } else {
            User.pokemonsCapture.push(req.body.pokemonsCapture)
            User.save((err, pokemon) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(200).send(pokemon);
            });
        }
    }).catch(err => errorManager.error500(res, err))
}

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id',  editUser)
router.delete('/:id', deleteUser)
router.post('/:id/addPokemon', addPokemonToUser)

module.exports = router