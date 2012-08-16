/**
 * @file
 * Transform the Google Shopping API response data into a predefined format.
 */

'use strict';

var filter = require('./filter')
  ;

/**
 * Transform the response data into the following format:
 *
 * {
 *   "id": "googleId",
 *   "link": "product link",
 *   "image": "first thumbnail image or the main image",
 *   "price": "price of the product",
 *   "merchant": "name of the merchant"
 * }
 *
 * @param {object} data
 *   Google Shopping API response data.
 *
 * @return {array}
 *   Transformed response data.
 */
module.exports = function (data) {
  var arr = [];

  filter(data).forEach(function (item, index, array) {
    arr.push({
      id: item.googleId,
      link: item.link,
      image: item.images[0].thumbnails ? item.images[0].thumbnails[0].link : item.images[0].link,
      price: item.inventories[0].price,
      merchant: item.author.name,
    });
  });

  return arr;
};
