const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const config = require('./server/config/key')
const cors = require('cors');

// let corsOptions = process.env.NODE_ENV === 'production' ? 
// {
//     origin: 'https://yebling.netlify.app',
//     credentials: true,
    
// } : 
// {
//     origin: 'http://localhost:3000',
//     credentials: true,    
// }

// path 모듈 불러오기
const path = require('path');

// 리액트 정적 파일 제공
app.use(express.static(path.join(__dirname, 'client/build')));

// 라우트 설정
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use(express.urlencoded({ extended: true })) 
// application/json
app.use(express.json())
app.use(cookieParser())
// app.use(cors(corsOptions)); 
app.use(cors()); 


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/users',  require('./server/routes/users'));
app.use('/api/product',  require('./server/routes/product'));

app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000
// let port =  process.env.NODE_ENV === 'production' ? process.env.PORT : 5000
app.listen(port, () => console.log(`Example app listening on port ${port}`))