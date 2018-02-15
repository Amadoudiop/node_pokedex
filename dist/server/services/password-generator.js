'use strict';

var generator = require('generate-password');

var generatePassword = function generatePassword(len) {
    return generator.generate({
        length: len,
        numbers: true
    });
};

module.exports.generatePassword = generatePassword;
//# sourceMappingURL=password-generator.js.map