const router=require('express').Router()
const {allProducts,singleProduct}=require('../controllers/productController')

router.get('/',allProducts)
router.get('/product/:id',singleProduct)

module.exports=router;