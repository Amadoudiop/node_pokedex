'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');
// const _ = require('lodash')
var User = require('../models/user');
var errorManager = require('../helpers/request-api-error');
var passwordGenerator = require('../services/password-generator');

var router = express.Router();

var getUsers = function getUsers(req, res) {
    var params = {
        lean: false,
        select: req.query.fields,
        page: req.query.page,
        limit: req.query.perPage,
        sort: _defineProperty({}, req.query.sortField, req.query.sortDir) };
    User.paginate({ _id: { $ne: req.user._id } }, params).then(function (result) {
        return res.json(result);
    }).catch(function (err) {
        return errorManager.error500(res, err);
    });
};

var getUser = function getUser(req, res) {
    var userId = req.params.id;
    var populate = [];
    var fields = { username: 1, email: 1, role: 1 };
    if (userId === req.user._id.toString()) {
        fields = {};
        populate = [{ path: 'contacts', select: 'username' }];
    }
    User.findById(userId, fields).populate(populate).then(function (user) {
        res.json(user);
    }).catch(function (err) {
        return errorManager.error500(res, err);
    });
};

var createUser = function createUser(req, res) {
    var p = req.body;
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
    if (!req.user || req.user.role !== 2) {
        return errorManager.error401(res);
    }

    var p = req.body;
    delete p._id;

    User.findByIdAndUpdate(req.user._id, p, { new: true }).then(function (result) {
        return res.json(result);
    }).catch(function (err) {
        return errorManager.error500(res, err);
    });
};

var deleteUser = function deleteUser(req, res) {
    if (!req.user || req.user.role !== 2) {
        return errorManager.error401(res);
    }

    User.findByIdAndRemove(req).then(function (result) {
        return res.json(result);
    }).catch(function (err) {
        return errorManager.error500(res, err);
    });
};

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/', editUser);
router.delete('/:userId', deleteUser);

module.exports = router;
//# sourceMappingURL=Users.js.map