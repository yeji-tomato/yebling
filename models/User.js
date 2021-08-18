const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {
        type: String,
        minlength: 4
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
        trim: true, // trim은 빈칸을 없애주는 용도
        unique: 1 // unique 중복 불가 
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
    image: String,
    // token 유효성 검사
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }