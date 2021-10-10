### Express js download

```
$ npm install express --save
```

### Mongoose

→ MongoDB를 잘 쓸 수 있도록 도와줌

```
$ npm install mongoose --save
```

mongoose를 이용해서 어플리케이션과 mongoDB를 연결할 수 있게 도와줌

### **[참고] Error : MongooseServerSelectionError**

[[참고] Error : MongooseServerSelectionError - 인프런 | 질문 & 답변](https://www.inflearn.com/questions/29435)

## MongoDB Model & Schema

Model이 무엇인가?

→ Model은 Schema를 감싸주는 역할

Schema가 무엇?

→ Schema는 예를 들어 상품에 관련한 게시물을 등록할 때 게시자, 제목, 설명의 type과 최대길이를 의미함 즉, 정보들을 이야기함

### Body Parser

→ client에서 server로 데이터를 보낼 때 body-parser Dependency를 이용함

```
$ npm install body-parser --save
```

### PostMan

→ client에서 Request를 줘야하는데 현재 client가 없으니 POSTMAN을 이용해서 request를 보낸다.

⚠️ **bodyParser에 취소선**

```jsx
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true})
// 위의 기존 작성을 쓰면 bodyParser에 취소선이 표시됨
// 이유 -> bodyparser가 express 특정버전 이후부터 기본 포함이기 때문에 
// 아래와 같이 작성
app.use(express.urlencoded({ extended: true }))
```

### Nodemon

→ 원래는 node서버를 킨 다음 무언가를 바꾸면 서버를 내린 뒤 다시 서버를 키는 불편함이 있었다. 이 노드몬을 이용하면 서버를 내리지 않아도 변화된 부분을 감지해서 반영해주는 장점이 있음

```
$ npm install nodemon -save-dev
```

### Bcrypt로 비밀번호 암호화

user.save하기 전 비밀번호를 암호화시켜야 함!!

```
$ npm install bcrypt --save
```

salt를 이용해서 비밀번호를 암호화 해야함 

salt를 먼저 생성함 → saltRounds가 10인 의미는 10자리인 비밀번호 암호화라는 의미

`로그인 시에 비밀번호 비교 시`

`→ 같은지 체크하기 위해선 암호화된 비밀번호를 복호화할 수 없으므로`

`plainPassword 암호화 시킨 뒤에 비교해야함`

### 토큰 생성을 위해 JSONWEBTOKEN

```
$ npm install jsonwebtoken --save
```

### cookie에 저장

→ 쿠키는 실제 데이터를 사용자 PC에 저장하기 때문에 데이터 암호화가 되어있더라도 pc에 저장되면 해킹 등  위협요소가 존재하게 된다. 또한 저장되어 있는 정보들은 서버와 사용자 pc간의 이동이 발생하여서 사용자 pc에 데이터를 직접적으로 저장하지 않는 session으로 옮겨주었다.

```
$ npm install cookie-parser --save
$ npm install express-session --save
$ npm i session-file-store -save
$ npm install mongoose-session --save
```

### Auth  기능 만들기

→ 로그인이 된 유저만 사용할 수 있는 페이지, 모든 유저 페이지, 관리자만 이용할 수 있는 페이지 등을 위한 기능
