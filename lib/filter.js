/**
 * @file
 * Filter Google Shopping API response data.
 */

'use strict';

/**
 * Filter response data.
 *
 * @param {object} data
 *   Response data object.
 *
 * @return {array}
 *   Filtered product data array.
 */
module.exports = function (data) {
  var arr = [];

  if (data.totalItems === 0) {
    return arr;
  }

  data.items.forEach(function (item, index, array) {
    arr.push(item.product);
  });

  return arr;
};
