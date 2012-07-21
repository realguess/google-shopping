/**
 * @file
 * Google Shopping.
 */

'use strict';

var https  = require('https')
  , qs     = require('querystring')
  , apikey = null
  ;

// Filter response data from Google Shopping.
exports.filter = require('./filter');

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
 *   Optional query parameters.
 * @param {function} callback
 *   The callback function with parameters of error and JSON data.
 */
function query(q, options, callback) {
  var req, key;

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  key = options.key || apikey;
  if (typeof key === 'undefined' || key === null) {
    return callback(null, null); // no key, no error nor data
  }

  // The only required parameters are {key} and {country}, {q} is not required.
  // If the query {q} is not specified, product data are still returned. We are
  // going to change this behavior here.
  //
  // @see https://developers.google.com/shopping-search/v1/getting_started#required-query-parameters
  if (typeof q === 'undefined' || q === null) {
    return callback(null, null); // no query, no error nor data
  }

  // Set required parameter: country
  options.country = options.country ? options.country : 'US';

  // Set default response format
  options.alt = options.alt ? options.alt : 'json';

  req = https.request({
    host: 'www.googleapis.com',
    path: '/shopping/search/v1/public/products' + '?' + qs.stringify(options),
  }, function (res) {
    var data = '';

    if (res.statusCode !== 200) {
      return callback(new Error('Request Error'), null); // TODO
    }

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      return callback(null, JSON.parse(data));
    });
  });

  req.end();

  req.on('error', function (err) {
    return callback(err, null);
  });
}
exports.query = query;
