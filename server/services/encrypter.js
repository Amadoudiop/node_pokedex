const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
const password = '2Mega0Era16'

const encrypt = (text) => {
    const cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}
const decrypt = (text) => {
    const decipher = crypto.createDecipher(algorithm, password)
    let decrypted = decipher.update(text, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt