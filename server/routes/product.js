const express = require('express');
const router = express.Router();
const multer  = require('multer');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    // destination : 파일이 저장되는 위치
    destination: function (req, file, cb) {
    //   cb(null, 'uploads/')
    cb(null, 'uploads/')
    },
    // filename : 저장되는 파일 이름
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage }).single("file")


router.post('/image', (req, res) => {
    // 가져온 이미지를 저장을 해주면 된다.
    upload(req, res, (err) => {
        if(err){
            return res.json({
                success: false,
                err
            })
        }

        return res.json({ 
            success: true, 
            filePath: 'uploads/' + res.req.file.filename, 
            fileName: res.req.file.filename  })
    })

})



module.exports = router;