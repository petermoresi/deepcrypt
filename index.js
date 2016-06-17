// Part of https://github.com/chris-rock/node-crypto-examples
// Credit to http://lollyrock.com/articles/nodejs-encryption/

// Nodejs encryption with CTR
var crypto = require('crypto')

function deepCrypto(password, fieldsToExclude, algorithm) {
  fieldsToExclude = fieldsToExclude || []
  algorithm = algorithm || 'aes-256-ctr'

  function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }


  function deepEncrypt(obj) {


    function e(v) {
      return Object.keys(v).reduce( (acc, item) => {

        // skip excluded fields
        if (fieldsToExclude.indexOf(item) > -1) {
          acc[item] = v[item]
          return acc;
        }

        // handle null and undefined values
        if (typeof v[item] === 'undefined') {
          acc[item] = undefined
          return acc;
        }

        // recursively encrypt
        if (typeof v[item] === 'object') {
          acc[item] = e(v[item])
          return acc;
        }

        var obj = {}
        obj[item] = v[item]
        acc[item] = encrypt( JSON.stringify( obj ) )
        return acc;

      }, {})
    }

    return e(obj)
  }

  function deepDecrypt(obj) {

    function d(v) {
      return Object.keys(v).reduce( (acc, item) => {

        console.log(item, v[item])

        // skip excluded fields
        if (fieldsToExclude.indexOf(item) > -1) {
          acc[item] = v[item]
          return acc;
        }

        // handle null and undefined
        if (typeof v[item] === 'undefined') {
          acc[item] = undefined
          return acc;
        }

        // recursively encrypt
        if (typeof v[item] === 'object') {
          acc[item] = d(v[item])
          return acc;
        }

        acc[item] = JSON.parse( decrypt(v[item]) )[item]
        return acc;
      }, {})
    }

    return d(obj)
  }

  return {
    encrypt: encrypt,
    decrypt: decrypt,
    deepEncrypt: deepEncrypt,
    deepDecrypt: deepDecrypt
  }

}

module.exports = deepCrypto
