var test = require('tape')
var dc = require('./index')('foo', ['id', 'updated'])

test('deepcrypt', function(t) {
  var e = dc.deepEncrypt
  var d = dc.deepDecrypt

  t.plan(8)
  // test strings
  t.deepEqual(e({ foo: "foo" }), { foo: '36e506799ef6510dc711dc99bb' });
  t.deepEqual(d({ foo: '36e506799ef6510dc711dc99bb' }), { foo: "foo" });

  // test numbers
  t.deepEqual(e({ foo: 1 }), { foo: '36e506799ef6511edc' } );
  t.deepEqual(d({ foo: '36e506799ef6511edc' }), { foo: 1 });

  // test boolean values
  t.deepEqual(e({ foo: 1, bar: true }), { foo: '36e506799ef6511edc', bar: '36e5027783f6515bd30bd6c6', } );
  t.deepEqual(d({ foo: '36e506799ef6511edc', bar: '36e5027783f6515bd30bd6c6', } ), { foo: 1, bar: true });

  // check fields to exclude
  t.deepEqual(e({ id: 1, updated: "test", foo: 1, bar: true }), { id: 1, updated: "test", foo: '36e506799ef6511edc', bar: '36e5027783f6515bd30bd6c6', } );
  t.deepEqual(d({ id: 1, foo: '36e506799ef6511edc', bar: '36e5027783f6515bd30bd6c6', }), { id: 1, foo: 1, bar: true });

});
