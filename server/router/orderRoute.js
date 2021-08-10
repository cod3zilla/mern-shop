const router=require('express').Router()
const {addOrder, getOrder, updateOrderToPaid, getMyOrders}=require('../controllers/orderController')
const {protectRoute}=require('../middlewares/authHandler')

// place order
router.route('/').post(protectRoute,addOrder)

// get order by id
router.route('/:id').get(protectRoute, getOrder)
// order update to payment
router.route('/:id/pay').put(protectRoute, updateOrderToPaid)

router.route('/myorders').get(protectRoute,getMyOrders)

module.exports=router;