var assert = require('assert');
var MapPromised = require('map-promised');
var MapCached = require('./');

var mapp = new MapPromised(new Map());
mapp.set('a', 1);
new MapCached(mapp).then((mapc) => {
  mapc.set('b', 2);
  assert.equal(mapc.size, 2);
  assert.equal(mapc.get('b'), 2);
  assert.equal(mapc.get('a'), 1);
  mapc.delete('b');
  assert.equal(mapc.size, 1);
  mapc.set('c', 3);
  mapc.set('d', 4);
  assert.equal(mapc.size, 3);
  mapc.flush();
  mapp.size.then((ans) => assert.equal(ans, 3));
  // ...
});
