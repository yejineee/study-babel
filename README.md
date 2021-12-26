# corejs와 regenerator로 폴리필 적용해보기

@babel/polyfill 모듈은 deprecated되었으므로, 직접 core-js와 regenerator를 설치해서 폴리필을 적용해보자.

`corejs3`, `regenerator`를 설치하고, `useBuiltIns`와 `corejs` 설정을 추가하여 바벨 설정을 해보자.

```bash
npm install --save core-js@3.20.1
npm i regenerator
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

```js
// source code
Array.from("Harry Porter");
// after running the transpiler 
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
```