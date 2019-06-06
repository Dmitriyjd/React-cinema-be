const Blowfish = require('javascript-blowfish');
const { BF_SECRET } = require('../config');

function encryptPassword(password) {
  const bf = new Blowfish(BF_SECRET);
  return bf.encrypt(password);
}

module.exports = encryptPassword;
