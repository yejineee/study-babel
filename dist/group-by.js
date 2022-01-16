"use strict";

require("core-js/modules/esnext.array.group-by.js");

var array = [1, 2, 3, 4, 5]; // groupBy groups items by arbitrary key.
// In this case, we're grouping by even/odd keys

array.groupBy(function (num, index, array) {
  return num % 2 === 0 ? 'even' : 'odd';
});