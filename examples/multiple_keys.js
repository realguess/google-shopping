/**
 * @file
 * Use multiple API keys.
 */

var gs   = require('google-shopping')
  , keys = ['123', '456', '789']
  , len  = keys.length
  , q    = 'apple'
  , i    = -1
  ;

// Round robin
gs.query(q, { key: keys[i=(i+=1)%len] }, function (err, data) {
  // Do something
});

// Random
gs.query(q, { key: keys[parseInt(Math.random()*len)] }, function (err, data) {
  // Do something
});
