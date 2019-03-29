"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _trim = _interopRequireDefault(require("./trim"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function slugify
 * @description Slugifys a string
 * @param {String} str
 * @param {String} del Delimiter, defaults to '-'
 * @return {String} Slugified string
 * @example
 * slugify(' This is a tesT ')
 * // this-is-a-test
 * @example
 * slugify(' This is a tesT ', ':')
 * // this:is:a:test
 */
var slugify = function slugify(str) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  return (0, _trim.default)(str).toLowerCase().replace(/ /g, sep) // Cambio espacios por el separador
  .normalize('NFD') // Quito todas las tildes
  .replace(/[\u0300-\u036f]/g, '');
};

var _default = slugify;
exports.default = _default;
module.exports = exports.default;