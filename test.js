var test = require('tape')
var dc = require('./index')('shhhhhhh', { exclude: ['id', 'updated'] })

test('deepcrypt', function(t) {
  var deepEncrypt = dc.deepEncrypt
  var deepDecrypt = dc.deepDecrypt

  t.plan(8)
  // basic tests
  t.deepEqual(deepDecrypt(deepEncrypt({ foo: "foo" })), { foo: "foo" });
  t.deepEqual(deepDecrypt(deepEncrypt({ foo: 1 })), { foo: 1 });
  t.deepEqual(deepDecrypt(deepEncrypt({ foo: 1, bar: true })), { foo: 1, bar: true });

  // test exlude fields
  var obj = deepEncrypt({ id: 1, updated: "test", foo: 1, bar: true })
  var encrypted = deepEncrypt(obj)
  t.equal(obj.id, encrypted.id)
  t.equal(obj.updated, encrypted.updated)
  t.notEqual(obj.foo, encrypted.foo)
  t.notEqual(obj.bar, encrypted.bar)
  t.deepEqual(deepDecrypt(encrypted), obj);

});
