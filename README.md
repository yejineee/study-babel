# 🤔 폴리필(Polyfills)은 왜 필요한거죠?

자바스크립트 엔진마다 자바스크립트의 스펙과 proposals을 지원하는 정도가 다르다. 

따라서 `트랜스파일러` 와 `폴리필` 을 사용하여 오래된 자바스크립트 엔진에서도 코드가 동작할 수 있도록 해주어야 한다. 

## Transpiler

트랜스파일러는 코드를 파싱하여, 오래된 자바스크립트 엔진에서도 동작할 수 있는 코드로 변환시켜준다.

```jsx
// source code
let hi = hi ?? 'hi'
// after running the transpiler 
"use strict";

var hi = hi !== null && hi !== void 0 ? hi : 'hi';
```

`babel`이 가장 많이 쓰이는 자바스크립트 트랜스파일러이다. 

`Next.js 12`에서 채택한 `SWC`도 있다.

[https://nextjs.org/blog/next-12#faster-builds-and-fast-refresh-with-rust-compiler](https://nextjs.org/blog/next-12#faster-builds-and-fast-refresh-with-rust-compiler)

## Polyfills

자바스크립트 스펙에는 해마다 새로운 스펙이 추가된다.

어떠한 자바스크립트 엔진은 새롭게 추가되는 자바스크립트 스펙 자체를 구현하지 않았을 수도 있다.

그러한 경우엔, 트랜스파일러를 통해 변환된 코드도, 해당 엔진에서는 동작할 수 없다.

예를 들어, `Array.from` 이라는 static 메서드는 ECMAScript 2015에 추가된 스펙이며, IE는 이를 지원하지 않는다. 

Array.from 을 사용한 코드를 바벨을 통해 트랜스파일한 결과를 보자.

```jsx
// source code
Array.from("Harry Porter");
// after running the transpiler 
"use strict";

Array.from("Harry Porter");
```

트랜스파일된 코드에서도 여전히 Array.from을 사용하고 있어, IE에서는 동작할 수 없는 코드이다.

이 때 필요한 것이 `폴리필` 이다. 

> A script that updates/adds new functions is called “polyfill”. It “fills in” the gap and adds missing implementations.
> 

**폴리필은 엔진에서는 구현하지 않은 기능을 구현해준 코드이다.**

- Array.from의 폴리필
    
    ```jsx
    // Production steps of ECMA-262, Edition 6, 22.1.2.1
    if (!Array.from) {
      Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
          var number = Number(value);
          if (isNaN(number)) { return 0; }
          if (number === 0 || !isFinite(number)) { return number; }
          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
          var len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        };
    
        // The length property of the from method is 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
          // 1. Let C be the this value.
          var C = this;
    
          // 2. Let items be ToObject(arrayLike).
          var items = Object(arrayLike);
    
          // 3. ReturnIfAbrupt(items).
          if (arrayLike == null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          }
    
          // 4. If mapfn is undefined, then let mapping be false.
          var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          var T;
          if (typeof mapFn !== 'undefined') {
            // 5. else
            // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
            if (!isCallable(mapFn)) {
              throw new TypeError('Array.from: when provided, the second argument must be a function');
            }
    
            // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length > 2) {
              T = arguments[2];
            }
          }
    
          // 10. Let lenValue be Get(items, "length").
          // 11. Let len be ToLength(lenValue).
          var len = toLength(items.length);
    
          // 13. If IsConstructor(C) is true, then
          // 13. a. Let A be the result of calling the [[Construct]] internal method
          // of C with an argument list containing the single item len.
          // 14. a. Else, Let A be ArrayCreate(len).
          var A = isCallable(C) ? Object(new C(len)) : new Array(len);
    
          // 16. Let k be 0.
          var k = 0;
          // 17. Repeat, while k < len… (also steps a - h)
          var kValue;
          while (k < len) {
            kValue = items[k];
            if (mapFn) {
              A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }
            k += 1;
          }
          // 18. Let putStatus be Put(A, "length", len, true).
          A.length = len;
          // 20. Return A.
          return A;
        };
      }());
    }
    ```
    
    [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#polyfill)
    

Array.from의 폴리필을 추가해주면, 이를 지원하지 않는 브라우저에서도 코드가 정상적으로 동작할 수 있다.

대표적인 폴리필 라이브러리로는 `corejs`와 [`polyfill.io`](http://polyfill.io)가 있다.

# corejs로 폴리필 적용해보기

`corejs3`를 설치하고, `useBuiltIns`와 `corejs` 설정을 추가하여 바벨 설정을 해보자.

```bash
npm install --save core-js@3.20.1
```

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11",
          "chrome": "67"
        },
        "useBuiltIns": "usage",
        "corejs": { "version": "3.20", "proposals": true }
      }
    ]
  ]
}
```

`useBuiltIns : usage` 는 각 파일에서 필요한 폴리필을 추가해준다. 

`corejs` 에는 설치한 corejs 버전을 명시해준다.

바벨 설정을 마친 후, 폴리필이 적용된 결과를 다시 살펴보면, 필요한 폴리필이 있는 corejs 라이브러리가 각 파일의 상단에 import된 것을 확인해볼 수 있다.

```bash
npx babel src --out-dir dist
```

```javascript
"use strict";

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

Array.from(name);
```


core-js 뿐만아니라, asyncGeneratorStep나, _asyncToGenerator 와 같은 헬퍼 함수들도 상단에 추가 된 것을 확인할 수 있다. 

- before

```javascript
const getApi = async () => {
  return fetch('http://example.com/movies.json')
}

```
- after
```javascript
"use strict";

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getApi = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", fetch('http://example.com/movies.json'));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getApi() {
    return _ref.apply(this, arguments);
  };
}();
```