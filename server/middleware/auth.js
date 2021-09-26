const { User } = require("../models/User")

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth
    // let token = req.session.user.x_auth

    // 토큰을 복호화 한 후 유저를 찾는다
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user){
            return res.json({ isAuth : false, err : true})
        }else{
            req.token = token;
            req.user = user;
            next();
            return res.json({isAuth: true })
        }

    })
}

module.exports = { auth }