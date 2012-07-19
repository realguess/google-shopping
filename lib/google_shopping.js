/**
 * @file
 * Google Shopping.
 */

'use strict';

var https  = require('https')
  , qs     = require('querystring')
  , filter = require('./filter')
  , apikey = null
  ;

/**
 * Set API key.
 *
 * @param {string} key
 *   The API key to be set.
 */
function setKey(key) {
  apikey = key;
}
exports.setKey = setKey;

/**
 * Query Google Shopping.
 *
 * @param {string} q
 *   The query string to be submitted to Google Shopping.
 * @param {object} options
 *   Optional query parameters. TODO
 * @param {function} callback
 *   The callback function with parameters of error and JSON data.
 */
function query(q, options, callback) {
  var req, key;

  if (typeof options === 'function') {
    callback = options;
  }

  if (typeof q === 'undefined' || q === null) {
    return callback(null, null); // no query, no error nor data
  }

  key = options.key || apikey;
  if (typeof key === 'undefined' || key === null) {
    return callback(null, null); // no key, no error nor data
  }

  // The only required parameters are {key} and {country}, {q} is not required.
  // If the query {q} is not specified, product data are still returned.
  //
  // @see https://developers.google.com/shopping-search/v1/getting_started#required-query-parameters
  req = https.request({
    host: 'www.googleapis.com',
    path: '/shopping/search/v1/public/products' + '?' + qs.stringify({
      key: key,
      country: options.country || 'US',
      q: q,
      alt: options.alt || 'json',
      maxResults: options.maxResults || 1000,
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
      return callback(null, filter(JSON.parse(data)));
    });
  });

  req.end();

  req.on('error', function (err) {
    return callback(err, null);
  });
}
exports.query = query;
