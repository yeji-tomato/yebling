const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 
// application/json
app.use(express.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/hello', (req, res) => res.send("안녕하세요~서버와 통신중 "))

app.post('/api/users/register', (req, res) =>{
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    // {
    //     id: "hello",
    //     password : "password"
    // }
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) =>{

    // 1. 요청된 아이디가 데이터베이스에 있는지 확인
    User.findOne({id : req.body.id}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 아이디에 해당하는 유저가 없습니다."
            })
        }
        // 2. 요청된 아이디가 데이터베이스에 있다면 비밀번호인지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) 
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })    
            
            // 3. 비밀번호까지 맞다면 토큰을 생성하기 
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err)

                // 토큰을 저장한다. -> 쿠키에(cookie-parser download)
                res.cookie('x_auth', user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
                })         
        })
    })
})

// role 0 -> 일반 유저 , role이 0이 아니면 -> 관리자
app.get('/api/users/auth', auth, (req, res) => {

    // middleware를 통과 후 이 코드 구문 실행
    // -> Authentication이 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth : true,
        id: req.user.id,
        name: req.user.name,
        gender: req.user.gender,
        email: req.user.email,
        birth: req.user.birth,
        phone: req.user.phone,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id}, 
    { token : "" }
    ,(err, user) => {
        if (err) return res.json({ success :false, err})
        return res.status(200).send({
            success: true
        })
    })
})

const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}`))