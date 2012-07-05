/**
 * @file
 * Google Shopping module Vows test suite.
 *
 * To run:
 *   node query.js API_KEY
 */

'use strict';

var vows   = require('vows')
  , assert = require('assert')
  , gs     = require('../lib/google_shopping')
  , key    = process.argv.slice(2)
  ;

// TODO Test: make sure it rotates keys.

// Test suite
vows.describe('Google Shopping').addBatch({
  'Query Google Shopping': {
    topic: function () {
      gs.key = key;
      gs.options.maxResults = 10;
      gs.query('Red Bull', this.callback);
    },
    'should return a valid kind': function (err, data) {
      assert.strictEqual(data.kind, 'shopping#products');
    },
    'should return a valid ID': function (err, data) {
      assert.strictEqual(data.id, 'tag:google.com,2010:shopping/products');
    },
    'should return correct item count': function (err, data) {
      assert.lengthOf(data.items, data.currentItemCount);
    },
  }
}).run();
