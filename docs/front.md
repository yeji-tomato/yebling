### React

```
$ npx create-react-app .
```

. 의 의미는 client 디렉토리 안에다가 react를 설치하겠다는 의미

⚠️ **npm WARN @babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining@7.14.5 requires a peer of @babel/core@^7.13.0 but none is installed. You must install peer dependencies yourself**

→ c컴파일러가 설치되어있어야 함

```
$ xcode-select --install
```

### React Router Dom

→ 링크 연결 시 필요한 것 (import { BrowserRouter,Route, Link,Switch } from "react-router-dom";)

```
$ npm i react-router-dom --save
```

### axios

```
$ npm i axios --save
```

jquery에서 ajax라고 보면됨!

### CORS 정책

→ Cross Origin Resource Sharing 

보안을 위해서 만들어진 cors 정책은 origin인 client와 server가 다른 포트 시에 발생된다! 각각 origin이기 때문!

### 여러가지 방법이 있지만 → proxy를 통해 해결함!

```
$ npm i http-proxy-middleware --save
```

**`setupProxy.js`** 파일을 만듬

```jsx
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    )
}
}
```

### proxy server 사용 이유!

1. 회사에서 직원들의 특정한 사이트 사용 제어
2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공
3. 더 나은 보안 제공
4. 이용 제한된 사이트 접근 가능

### Concurrently

→ 프론트, 백 서버 한번에 켜기 

여러개의 commands를 동시에 작동시킬 수 있게 해주는 Tool

```
$ npm i concurrently --save
```

`package.json`

```jsx
"dev": "concurrently \"npm run backend \" \"npm run start --prefix client \""
```

### Redux

→ state 상태관리라이브러리

**Props와 State**

**Props**는 컴포넌트 외부에서 컴포넌트에게 주는 데이터(부모  컴포넌트 → 자식 컴포넌트 단, 자식컴포넌트에서 데이터 수정 불가!)

**State**는 컴포넌트 내부에서 변경할 수 있는 데이터

다운 받아야 할 Dependency들

1. redux
2. react-redux
3. redux-promise → dispatch에게 Promise로 왔을 시 대체
4. redux-thunk → dispatch에게  functionn으로 왔을 시 대체

⇒ Store에서 언제나 객체형식으로 받는 게 아님 But, Redux Store는 오직 객체형식만 이용함

즉, redux-promise와 redux-thunk는 redux를 잘 사용할 수 있게 도와주는 middleware

```
$ npm i redux react-redux redux-promise redux-thunk --save
```

`index.js`

```jsx
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer  from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

<Provider
   store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__() // chrome reduxDevTools를 사용하기 위한 코드
   )}>
    <React.StrictMode>
      <App />
  </React.StrictMode>
 </Provider>
```

Boiler plate

Formik Yup

### AntDesign

→ 중국에서 만들어진 css 프레임워크

```
$ npm i antd --save
```

### Styled Components

→ 스타일 라이브러리 비슷한 라이브러리로는 Emotion이 있음

```
$ npm i styled-components
```

### AntDesign 기본 색 변경하기

→ 기존 프로젝트 설정을 유지하면서 새로 추가하고 싶은 설정만 오버라이딩 하는 방법

[Use in create-react-app - Ant Design](https://3x.ant.design/docs/react/use-with-create-react-app)

```
$ npm i react-app-rewired customize-cra -D
$ npm i babel-plugin-import -D
$ npm i less less-loader -D
-- TypeError: this.getOptions is not a function
$ npm i less-loader@5 -D
```

**`config-overrides.js`**

```jsx
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#7B2A2A' },
    }),
);
```

`**package.json**`

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
to
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
 }
```

### HOC

Higher Order Component는 function으로 다른 컴포넌트를 받은 다음 새로운 컴포넌트를 리턴하는 것

⇒ 해당 유저가 해당 페이지에 들어갈 자격이 되는 지 알아낸후 자격이 된다면 페이지 접근 가능, 아니면 다른 페이지로 보내버림

ex) 로그인한 유저가 또 다시 로그인 페이지로 들어가는 것을 막는 방법

### Upload Page

→ Drop-zone 라이브러리 다운 받기(cd client에서)

```
$ npm i react-dropzone --save
```

### multer

→ 이미지 저장

```
$ npm i multer --save
```

### Image

→ client 상세 정보 페이지에 보이는 이미지 라이브러리

```
$ npm i react-image-gallery --save
```
