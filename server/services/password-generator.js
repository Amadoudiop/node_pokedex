const generator = require('generate-password')

const generatePassword = len => generator.generate({
    length: len,
    numbers: true,
})

module.exports.generatePassword = generatePassword