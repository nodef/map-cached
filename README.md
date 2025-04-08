# map-cached

[![NPM](https://nodei.co/npm/map-cached.png)](https://nodei.co/npm/map-cached/)

Fully Cached interface for a Promised Map.

```javascript
var MapCached = require('map-cached');
// MapCached(<source>, <set-cache>);
// source:    a promised map, like MapPg (map-pg)
// set-cache: size of set cache, flushed when full or manually
```
```javascript
var MapPromised = require('map-promised');
var MapCached = require('map-cached');

var mapp = new MapPromised(new Map());
var mapc = new MapCached(mapp);
mapp.setup().then(() => {
  mapp.set('a', 1);
}).then(() => {
  return mapc.setup();
}).then(() => {
  mapc.set('b', 2);
  mapc.size;             // 2
  mapc.get('b');         // 2
  mapc.get('a');         // 1
  mapc.delete('b');
  mapc.size;             // 1
  mapc.set('c', 3);
  mapc.set('d', 4);
  mapc.size;             // 3
  mapc.flush().then(() => {
    return mapp.size;
  }).then((ans) => ans); // 3
  // ...
});
```

![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/map-cached)
