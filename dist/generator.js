"use strict";

require("regenerator-runtime/runtime.js");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(idMaker);

function idMaker() {
  var index;
  return regeneratorRuntime.wrap(function idMaker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!true) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return index++;

        case 4:
          _context.next = 1;
          break;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var gen = idMaker(); // "Generator { }"

console.log(gen.next().value); // 0

console.log(gen.next().value); // 1

console.log(gen.next().value); // 2