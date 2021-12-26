# @babel/core - Babel의 코어 기능이 있는 모듈

- 설치

```bash
npm install --save-dev @babel/core
```

# @babel/cli - babel에 대한 cli

- 설치
    
    ```bash
    npm install --save-dev @babel/cli
    ```
    
- 사용
    
    ```bash
    npx babel object-rest.js --out-dir dist
    ```
    
    object-rest.js 파일을 파싱하여, transformation을 적용한 파일을 dist에 저장하라는 의미이다.
    
    아직까지 어떠한 transformation을 사용하라고 명시한 plugin이나 preset이 없기 때문에, source와 output은 동일하다.
    
    ```jsx
    const {a, ...rest} = {a: 'a', b :'b', 'c': 'c'};
    console.log(a); // a
    console.log(rest); // { b: 'b', c: 'c' }
    ```
    
    ```jsx
    const {
      a,
      ...rest
    } = {
      a: 'a',
      b: 'b',
      'c': 'c'
    };
    console.log(a); // a
    
    console.log(rest); // { b: 'b', c: 'c' }
    ```
    

# Plugin

transformation은 plugin이라는 프로그램에 의해 수행된다.

plugin은 바벨에게 코드를 어떤 식으로 변환(transformation)해야하는지를 지시한다.

바벨의 공식 플러그인인 `@babel/plugin-proposal-object-rest-spread` 을 사용하여, 다음 파일을 변환하여 보자.

```bash
# @babel/plugin-proposal-object-rest-spread 설치
npm install --save-dev @babel/plugin-proposal-object-rest-spread
# 트랜스파일러 실행
npx babel object-rest.js --out-dir dist --plugins=@babel/plugin-proposal-object-rest-spread
```

```jsx
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const _a$b$c = {
  a: 'a',
  b: 'b',
  'c': 'c'
},
      {
  a
} = _a$b$c,
      rest = _objectWithoutProperties(_a$b$c, ["a"]);

console.log(a); // a

console.log(rest); // { b: 'b', c: 'c' }
```

# Preset

한 프로젝트 안에는 이렇게 변환이 필요한 코드들마다 플러그인을 추가해야 한다.

그러나, 일일이 플러그인을 설치하고 추가하는 것은 귀찮다.

이를 위해 플러그인들을 모아둔 것이 `Preset` 이다.

`@babel/preset-env` 는 타겟 브라우저에 필요한 플러그인들을 추가해주는 프리셋이다.

이 프리셋을 설치해서 변환해보자.

- 설치

```jsx
npm install --save-dev @babel/preset-env
```

```jsx
npx babel object-rest.js --out-dir dist --presets=@babel/env
```

```jsx
"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _a$b$c = {
  a: 'a',
  b: 'b',
  'c': 'c'
},
    a = _a$b$c.a,
    rest = _objectWithoutProperties(_a$b$c, ["a"]);

console.log(a); // a

console.log(rest); // { b: 'b', c: 'c' }
```

# 바벨 설정 파일

```jsx
npx babel object-rest.js --out-dir dist --presets=@babel/env
```

위의 명령어를 일일이 치는 것은 불편하고, 프로젝트 전반에 통일된 설정을 관리하기도 어렵다.

바벨 설정파일로 관리해보자.

- babel.config.json
    
    ```jsx
    {
      "presets": [
        [
          "@babel/preset-env",
          {
            "targets": {
              "ie": "11",
              "chrome": "67"
            }
          }
        ]
      ]
    }
    ```
    

package.json에서 script를 정의해두자.

```jsx
{
  "scripts": {
    "babel": "babel src --out-dir dist"
  },
	...
}
```

이제 `npm run babel` 로 실행시키면, dist에 변환된 소스 파일들이 생긴다.

# Reference

[https://babeljs.io/docs/en/usage](https://babeljs.io/docs/en/usage)