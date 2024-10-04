// crypto_utils.js
const forge = require('node-forge');
const blake3 = require('blake3');

// Cifrado y Descifrado IDEA
function ideaEncrypt(plaintext, key) {
  const cipher = forge.cipher.createCipher('IDEA-ECB', key);
  cipher.start();
  cipher.update(forge.util.createBuffer(plaintext));
  cipher.finish();
  return forge.util.encode64(cipher.output.getBytes());
}

function ideaDecrypt(ciphertext, key) {
  const decipher = forge.cipher.createDecipher('IDEA-ECB', key);
  decipher.start();
  decipher.update(forge.util.createBuffer(forge.util.decode64(ciphertext)));
  decipher.finish();
  return decipher.output.toString();
}

// Hashing con BLAKE3
function hashBlake3(data) {
  return blake3.hash(data).toString('hex');
}

module.exports = { ideaEncrypt, ideaDecrypt, hashBlake3 };
