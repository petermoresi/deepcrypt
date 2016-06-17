// Part of https://github.com/chris-rock/node-crypto-examples
// Credit to http://lollyrock.com/articles/nodejs-encryption/

// Nodejs encryption with CTR
var crypto = require('crypto')

function deepCrypto(password, opts) {
  var fieldsToExclude = opts.exclude || [],
  algorithm = opts.algorithm || 'aes-256-ctr'

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

        var val = 'A' + crypto.randomBytes(4).toString() + JSON.stringify( v[item] )
        acc[item] = encrypt( val )
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

        var val = decrypt(v[item])

        // version 1
        if (val[0] === '{') {
          acc[item] = JSON.parse( val )[item]
          return acc;
        }

        // version 2
        if (val[0] === 'A') {
          acc[item] = JSON.parse( val.substr(5) )
          return acc;
        }

        throw 'unsupported version!'

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
