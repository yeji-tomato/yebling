const mongoose = require('mongoose')
// const Schema = mongoose.Schema


const productSchema = mongoose.Schema({
//    writer: {
//        type: Schema.Types.ObjectId,
//        ref: 'User'
//    },
    images: {
        type: Array,
        default: []
    },
   jetype: {
     type: String,
     maxlength : 10
   },
   title:{
       type: String,
       maxlength : 50
   },
   price: {
       type: Number,
       default: 0
   },
   count: {
       type: Number,
       default: 0
   },
   material:{
       type: String,
       maxlength : 50
   },
   size: {
    type: String,
    maxlength : 50
   },
   stone: {
     type: String,
     maxlength : 50
   },
   details:{
     type: String
   },
   sold: {
       type: Number,
       maxlength: 100,
       default: 0
   },
   views: {
       type: Number,
       default: 0
   }
}, { timestamps: true })

productSchema.index({
    title:'text',
    details: 'text'
},{
    weight: {
        title: 5,
        details: 1
    }
})


const Product = mongoose.model('Product', productSchema)

module.exports = { Product }