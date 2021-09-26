const mongoose = require('mongoose')
const bcrpt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    id: {
        type: String,
        minlength: 4,
        unique: 1 // unique 중복 불가 
    },
    password: {
        type: String,
        minlength : 4
    },
    name: {
        type: String,
        maxlength: 50
    },
    gender: {
        type: String,
        maxlength: 10
    },
    email: {
        type: String,
        unique: 1 // unique 중복 불가 
        // trim: true // trim은 빈칸을 없애주는 용도
    },
    birth: Date,
    phone: {
        type: Number,
        maxlength: 11
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    // token 유효성 검사
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){
    var user = this   
    if(user.isModified('password')){
        // 비밀번호를 암호화 시킨다.
        bcrpt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrpt.hash(user.password, salt, function(err, hash){
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})

userSchema.methods.bcrptPassword = function(pwd, next){
     // 비밀번호를 암호화 시킨다.
     bcrpt.genSalt(saltRounds, function(err, salt){
        if(err) return next(err)

        bcrpt.hash(pwd, salt, function(err, hash){
            if (err) return next(err)
            pwd = hash
            next(hash)
        })
    })
}

userSchema.methods.comparePassword = function(plainPassword, cb){

    // plainPassword 1234567 
    // 암호화된 비밀번호 $2b$10$nuQHAKbk7IvF/
    // -> 같은지 체크하기 위해선 암호화된 비밀번호를 복호화할 수 없으므로 
    // plainPassword 암호화 시킨 뒤에 비교해야함
    bcrpt.compare(plainPassword, this.password, function(err, isMatch){
        console.log('plainPassword', plainPassword)
        console.log('this.password', this.password)
        if(err) return cb(err)
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this
    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token
    // 토큰 해석 시 'secretToken'을 이용해서 user._id를 찾을 수 있음
    // 즉, user가 누구인지를 알 수 있음
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}
 
userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // 토큰을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }