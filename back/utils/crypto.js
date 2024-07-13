const crypto = require('crypto');

const initVector = Buffer.from('3e10bb241d611ac910af5d8690011e6c', 'hex');
const SecurityKey = Buffer.from('34db16c275e2895654e798794f6e47ae', 'hex');
const algorithm = 'aes-128-cbc';

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, SecurityKey, initVector);
  let crypted = cipher.update(text, 'utf8', 'base64');
  crypted += cipher.final('base64');
  return crypted;
}

function decrypt(text) {
  let decipher = crypto.createDecipheriv(algorithm, SecurityKey, initVector);
  let dec = decipher.update(text, 'base64', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
  encrypt,
  decrypt,
};
