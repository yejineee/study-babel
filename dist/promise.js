"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/promise"));

new _promise["default"](function (resolve, reject) {
  resolve('success');
}).then(function (v) {
  console.log("then : ".concat(v));
})["catch"](function (v) {
  console.log("catch : ".concat(v));
})["finally"](function () {
  console.log("finally");
});