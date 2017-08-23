var $ = function MapCached(src, cap) {
  this._src = src;
  this._cap = cap||1024;
  this._map = new Map();
  this._set = new Map();
  return this._src.valueOf().then((ans) => {
    this._map = ans;
    return this;
  });
};
module.exports = $;

var _ = $.prototype;

Object.defineProperty(_, 'size', {'get': function() {
  return this._map.size;
}});

_.flush = function() {
  var a = [];
  for(var [k, v] of this._set)
    a.push(v===undefined? this._src.delete(k) : this._src.set(k, v));
  this._set.clear();
  return Promise.all(a);
};

_.evict = function() {
};

_.set = function(k, v) {
  if(this._set.size>=this._cap) process.nextTick(() => this.flush());
  if(v===undefined) this._map.delete(k);
  else this._map.set(k, v);
  this._set.set(k, v);
  return this;
};

_.get = function(k) {
  return this._map.get(k);
};

_.delete = function(k) {
  return this.set(k, undefined);
};

_.has = function(k) {
  this.get(k).then((ans) => ans===undefined? false : true);
};

_.clear = function() {
  this._map.clear();
  this._set.clear();
  return this._src.clear();
};

_.forEach = function(fn, thisArg) {
  return this._map.forEach(fn, thisArg);
};

_.valueOf = function() {
  return this._map;
};

_.entries = function() {
  return this._map.entries();
};

_.keys = function() {
  return this._map.keys();
};

_.values = function() {
  return this._map.values();
};
