# map-cached

[![NPM](https://nodei.co/npm/map-cached.png)](https://nodei.co/npm/map-cached/)

Fully Cached interface for a Promised Map.

```javascript
var MapPromised = require('map-promised');
var MapCached = require('map-cached');
// MapCached(<source>, <set cache capacity>)

var mapp = new MapPromised(new Map());
mapp.set('a', 1);
new MapCached(mapp).then((mapc) => {
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
