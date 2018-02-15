'use strict';

var crypto = require('crypto');

var algorithm = 'aes-256-ctr';
var password = '2Mega0Era16';

var encrypt = function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};
var decrypt = function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
//# sourceMappingURL=encrypter.js.map