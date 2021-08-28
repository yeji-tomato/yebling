const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')
const session = require('express-session')


// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 
// application/json
app.use(express.json())
app.use(cookieParser('yebling'))

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.use(session({
    secret: 'yebling',
    resave: false,
    saveUninitialized: true,
    store:require('mongoose-session')(mongoose),  // session 저장 장소 (Mongoose를 이용하여 Mongodb로 설정)
    cookie:{maxAge:(3.6e+6)*24} // 24시간 뒤 만료(자동 삭제)
}))

app.post('/api/users/register', (req, res) =>{
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    // {
    //     id: "hello",
    //     password : "password"
    // }
    
    User.findOne({id: req.body.id} , (err, user) => {
        if(user){
            return res.json({
                idcheckSuccess: false,
                message: "해당되는 아이디가 존재합니다."
            })
        }
        const userReg = new User(req.body)
        userReg.save((err, userInfo) => {
            if(err) return res.json({ 
                success: false, 
                message: "회원가입에 실패하였습니다😰",
                err
             })
            return res.status(200).json({
                success: true
            })
        })
    })
})

// app.get('/api/users/checkid', (req, res) => {
//     User.findOne({id: req.body.id} , (err, user) => {
//         if(user){
//             return res.json({
//                 idcheckSuccess: false,
//                 message: "해당되는 아이디가 존재합니다."
//             })
//         }
//     })
// })

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
                if(err){
                    return res.status(400).send(err)
                }else{
                    req.session.user = {
                        id: user.id,
                        role: user.role,
                        x_auth: user.token
                    }
                    console.log(req.session.user)
                    req.session.save(err => {if(err) console.log(err)})
                    return res.status(200).json({ loginSuccess: true })

                // 토큰을 저장한다. -> 쿠키에(cookie-parser download)
                // res.cookie('x_auth', user.token)
                // .status(200)
                // .json({ loginSuccess: true, userId: user._id })
                }

                // 토큰을 저장한다. -> 쿠키에(cookie-parser download)
                // res.cookie('x_auth', user.token)
                // .status(200)
                // .json({ loginSuccess: true, user: req.session.user })
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
        id: req.user.id
        // name: req.user.name,
        // gender: req.user.gender,
        // email: req.user.email,
        // birth: req.user.birth,
        // phone: req.user.phone,
        // role: req.user.role,
    })
})

// app.get('/api/users/logout', auth, (req, res) => {
//     User.findOneAndUpdate({ _id: req.user._id}, 
//     { token : "" }
//     ,(err, user) => {
//         if (err) return res.json({ success :false, err})
//         return res.status(200).send({
//             success: true
//         })
//     })
// })

// app.get('/api/users/logout', (req, res) => {
//     User.findOneAndUpdate({ id: req.user.id }, (err, user) => {
//         if(req.session.user){
//             req.session.destroy();
//             return res.status(200).send({
//                 success: true
//             })
//         }else{
//             return res.json({ success :false, err})
//         }
//     })
// })

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id}, 
    { token : "" },
    req.session.destroy()
    ,(err, user) => {
        if (err) return res.json({ logoutSuccess :false, err})
        return res.status(200).send({
            logoutSuccess: true
        })
    })
})



const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}`))