/**
 * @file
 * Google Shopping.
 */

/*global exports:true*/

'use strict';

var https = require('https')
  , qs    = require('querystring')
  ;

/**
 * An API key or an array of API keys.
 */
exports.key = [];

/**
 * If there are more than one key, then the index is pointing the key that will
 * be used in the next query request. If there is only one key, the index is
 * always 0.
 */
exports.index = 0;

/**
 * Query parameters other than q (query).
 */
exports.options = {
  country: 'US',
  alt: 'json',
  maxResults: 1000
};

/**
 * Query Google Shopping.
 *
 * @param {string} q
 *   The query string to be submitted to Google Shopping.
 * @param {function} callback
 *   The callback function with parameters of error and JSON data.
 */
function query(q, callback) {
  var req
    , key = exports.key
    , index = exports.index
    , opt = exports.options
    ;

  q = q.toString().trim(); // must be a string

  if (q === '') {
    return callback(null, null); // no query, no error nor data
  }

  if (typeof key === 'undefined' || key === null) {
    return callback(null, null); // no key, no error nor data
  }

  if (typeof key === 'string') {
    key = [key];
  }

  if (!Array.isArray(key)) {
    key = [key.toString()];
  }

  // TODO at this point, key and q should be cleaned up.
  req = https.request({
    host: 'www.googleapis.com',
    path: '/shopping/search/v1/public/products' + '?' + qs.stringify({
      key: key[index],
      country: opt.country,
      q: q,
      alt: opt.alt,
      maxResults: opt.maxResults,
    }),
  }, function (res) {
    var data = '';

    if (res.statusCode !== 200) {
      return callback(new Error('Request Error'), null); // TODO
    }

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      // Rotate to use the next key
      index = (index + 1) % key.length;

      return callback(null, JSON.parse(data));
    });
  });

  req.end();

  req.on('error', function (err) {
    return callback(err, null);
  });
}
exports.query = query;
