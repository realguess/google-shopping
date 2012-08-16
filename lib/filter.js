/**
 * @file
 * Filter Google Shopping API response data.
 */

'use strict';

/**
 * Filter response data.
 *
 * Filter Google Shopping API response data with specified fields to be
 * returned. If no fields are listed, all will be returned.
 *
 * @param {object} data
 *   Response data object.
 * @param {array} fields
 *   An array of fields to keep.
 *
 * @return {array}
 *   Filtered product data array.
 */
module.exports = function (data, fields) {
  var arr = [];

  if (data.totalItems === 0) {
    return arr;
  }

  if (typeof fields === 'undefined' || !Array.isArray(fields)) {
    fields = [];
  }

  data.items.forEach(function (item, index, array) {
    var filteredItem;

    if (!fields.length) {
      return arr.push(item.product);
    }

    filteredItem = {};
    fields.forEach(function (field, index, array) {
      filteredItem[field] = item.product[field];
    });

    arr.push(filteredItem);
  });

  return arr;
};
