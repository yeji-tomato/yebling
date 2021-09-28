const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const config = require('./config/key')
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

app.use(express.urlencoded({ extended: true })) 
// application/json
app.use(express.json())
app.use(cookieParser())
app.use({
        origin: 'https://yebling.netlify.app',
        credentials: true,
        
    });

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'));

// // 리액트 정적 파일 제공
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, 'client/build')));
//     // 라우트 설정
//     app.get('/', (req, res) => {
//         res.sendFile(path.join(__dirname+'/client/build/index.html'));
//     });
// }

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

app.use('/uploads', express.static('uploads'));

// const port = 5000
// const port = process.env.PORT || 5000
let port =  process.env.NODE_ENV === 'production' ? process.env.PORT : 5000
app.listen(port, () => console.log(`Example app listening on port ${port}`))