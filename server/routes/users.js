const express = require('express');
const router = express.Router();
const { User } = require('../models/User')
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');
const { auth } = require('../middleware/auth')
const async = require('async');

//=================================
//             User
//=================================


// role 0 -> 일반 유저 , role이 0이 아니면 -> 관리자
router.get("/auth", auth, (req, res) => {
    // middleware를 통과 후 이 코드 구문 실행
    // -> Authentication이 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth : true,
        id: req.user.id,
        name: req.user.name,
        gender: req.body.gender,
        email: req.user.email,
        phone: req.user.phone,
        cart: req.user.cart,
        history: req.user.history
    }); 
});

router.post("/register", (req, res) => {
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
        // console.log(err)
    })
});

router.post("/edit", (req, res) => {
    User.findOne(
        { id: req.body.id },
        (err, user) => {
            user.bcrptPassword(user.password, pwd => {
                const body = {
                    id:  req.body.id,
                    password: pwd,
                    name: req.body.name,
                    gender: req.body.gender,
                    email: req.body.email,
                    birth: req.body.birth,
                    phone: req.body.phone
                }
                User.findOneAndUpdate(
                    { id: req.body.id },
                    { $set: body },
                    { returnNewDocument: true },
                    (err, userEdit) => {
                        if(err) return res.json({ 
                            success: false, 
                            err
                         })
                        return res.status(200).json({
                            success: true
                        })
                    }
                )
            })
    })
});

router.post("/findId", (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                success: false,
                message: "일치하는 회원이 없습니다. 회원가입을 해주세요!😰"
            })
        }else{
            if(err) return res.json({ 
                success: false, 
                message: "아이디 찾기에 실패하였습니다."
             })
            return res.status(200).json({
                success: true,
                id: user.id
            })
        }
    })
})

router.post("/findPw", (req, res) => {
    User.findOne({id : req.body.id}, (err, user) => {
        if(!user){
            return res.json({
                success: false,
                message: "일치하는 아이디가 없습니다.😰"
            })
        }else{
            if(err) return res.json({ 
                success: false, 
                message: "비밀번호 찾기에 실패하였습니다."
             })
            return res.status(200).json({
                success: true,
                id: user.id
            })
        }
    })
})

router.post("/updatePw", (req, res) => {
    User.findOne(
        { id: req.body.id },
        (err, user) => {
            user.bcrptPassword(user.password, pwd => {
                User.findOneAndUpdate( 
                    { id: req.body.id },
                    { password: pwd },
                    (err, updateUser => {
                        if(err) return res.json({ 
                            success: false, 
                            err
                         })
                        return res.status(200).json({
                            success: true
                        })
                    })
                )
            })        
        })
});
 
router.post("/login", (req, res) => {
    // 1. 요청된 아이디가 데이터베이스에 있는지 확인
    User.findOne({id : req.body.id}, (err, user) => {
    if(!user){
        return res.json({
            loginSuccess: false,
            message: "제공된 아이디에 해당하는 회원이 없습니다."
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
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
   
    // 먼저 User Collection에 해당 유저의 정보를 가져오기
    User.findOne({ _id: req.user._id },
        (err, userInfo) => {
            // 가져온 정보에서 카트에다가 넣으려 하는 상품이 이미 들어 있는지 확인
            let duplicate = false;
            userInfo.cart.forEach((item)=> {
                if(item.id === req.body.productId){
                    duplicate = true;
                }
            })

            // 상품이 이미 있을 때
            if(duplicate){
                User.findOneAndUpdate(
                    { _id: req.user._id, "cart.id": req.body.productId },
                    { $inc: {"cart.$.quantity": 1 }},
                    { new: true },
                    (err, userInfo) => {
                        if(err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            // 상품이 이미 있지 않을 때
            else{
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if(err) return res.status(400).json({success: false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            }


        })
});

router.get('/products_by_id', (req, res) => {
    
    let type = req.query.type;
    let productIds = req.query.id

    if(type === "array"){

        // id=123123123, 324234234, 3252323232 type=array 이거를 
        // productIds = ['123123123', '324234234', '3252323232'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })
    }

   // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다
    Product.find({ _id: {$in: productIds} })
    .exec((err, product) => {
        if(err) return res.status(400).send(err)
        return res.status(200).send(product)
    })

})

router.get("/removeCart", auth, (req, res) => {
     
    //먼저 cart안에 내가 지우려고 한 상품을 지워주기 
     User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query.id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            //product collection에서  현재 남아있는 상품들의 정보를 가져오기 

            //productIds = ['5e8961794be6d81ce2b94752', '5e8960d721e2ca1cb3e30de4'] 이런식으로 바꿔주기
            Product.find({ _id: { $in: array } })
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        }
    )
});

router.post('/successBuy', auth, (req, res) => {


    //1. User Collection 안에  History 필드 안에  간단한 결제 정보 넣어주기
    let history = [];
    let transactionData = {};

    // console.log('req.body.cartDetail', req.body.cartDetail);

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: new Date(Date.now()).toDateString(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            image: item.images[0],
            jetype: item.jetype,
            details: item.details
        })
    })

    //2. Payment Collection 안에  자세한 결제 정보들 넣어주기 
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    // transactionData.data = req.body.paymentData
    transactionData.product = history

    //history 정보 저장 
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err })


            //payment에다가  transactionData정보 저장 
            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err })


                //3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기 
                //상품 당 몇개의 quantity를 샀는지 

                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })


                async.eachSeries(products, (item, callback) => {

                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                }
                )
            })
        }
    )
})



module.exports = router;