# deepcrypt

Node.js library to encrypt object while maintaining object structure. The values are encrypted but
the keys are left intact. Built to stuff encrypted objects into NoSQL databases like MongoDB.

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
