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
  , key    = process.argv[2]
  ;

// Test suite
vows.describe('Google Shopping').addBatch({
  'Query Google Shopping': {
    topic: function () {
      gs.query('Red Bull', { key: key, maxResult: 10 }, this.callback);
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

    'with thumbnails': {
      topic: function () {
        gs.query('Red Bull', { key: key, thumbnails: '64:64,160:*,*:120,160:120', maxResult: 1 }, this.callback);
      },
      'should return a thumbnail with size 64x64': function (err, data) {
        assert.strictEqual(data.items[0].product.images[0].thumbnails[0].width, 64);
        assert.strictEqual(data.items[0].product.images[0].thumbnails[0].height, 64);
      },
      'should return a thumbnail with width 160': function (err, data) {
        assert.strictEqual(data.items[0].product.images[0].thumbnails[1].width, 160);
      },
      'should return a thumbnail with height 120': function (err, data) {
        assert.strictEqual(data.items[0].product.images[0].thumbnails[2].height, 120);
      },
      'should return a thumbnail with size 160x120': function (err, data) {
        assert.strictEqual(data.items[0].product.images[0].thumbnails[3].width, 160);
        assert.strictEqual(data.items[0].product.images[0].thumbnails[3].height, 120);
      },
    },
  },
}).run();
