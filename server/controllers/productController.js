const mongoose=require('mongoose')
const Product = require('../models/Product')
const Prodcut=require('../models/Product')

//localhost/products
exports.allProducts=async(req, res)=>{
    const _products=await Product.find({})
    .then(products=>{
        res.status(200).json(products)
    })
    .catch(err=>console.log(err))
}
//localhost/products/product:id
exports.singleProduct= async(req, res)=>{
    const _product= await Product.findById({_id:req.params.id})
    .then(product=>{
        res.status(200).json(product)
    })
    .catch(error=>console.log(error))
}