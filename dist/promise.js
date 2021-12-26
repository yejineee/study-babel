"use strict";

new Promise(function (resolve, reject) {
  resolve('success');
}).then(function (v) {
  console.log("then : ".concat(v));
}).catch(function (v) {
  console.log("catch : ".concat(v));
}).finally(function () {
  console.log("finally");
});