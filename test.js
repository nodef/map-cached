var assert = require('assert');
var MapPromised = require('map-promised');
var MapCached = require('./');

var mapp = new MapPromised(new Map());
var mapc = new MapCached(mapp);
mapp.setup().then(() => {
  mapp.set('a', 1);
}).then(() => {
  return mapc.setup();
}).then(() => {
  mapc.set('b', 2);
  assert.equal(mapc.size, 2);
  assert.equal(mapc.get('b'), 2);
  assert.equal(mapc.get('a'), 1);
  mapc.delete('b');
  assert.equal(mapc.size, 1);
  mapc.set('c', 3);
  mapc.set('d', 4);
  assert.equal(mapc.size, 3);
  mapc.flush().then(() => {
    return mapp.size;
  }).then((ans) => assert.equal(ans, 3));
  // ...
});
