# deepcrypt

Node.js library to encrypt object while maintaining object structure.

## install

```sh
npm install --save deepcrypt
```

### usage

```js
var { deepEncrypt, deepDecrypt } = require('deepcrypt')('secret$here')

deepDecrypt(
  deepEncrypt({
    your: "object",
    goes: 'here'
  })
) 
```
