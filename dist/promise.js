"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

new Promise(function (resolve, reject) {
  resolve('success');
}).then(function (v) {
  console.log("then : ".concat(v));
}).catch(function (v) {
  console.log("catch : ".concat(v));
}).finally(function () {
  console.log("finally");
});