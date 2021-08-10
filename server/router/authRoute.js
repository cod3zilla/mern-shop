const router=require('express').Router()
const {login,register,update, getUserProfile}=require('../controllers/authController')
const {protectRoute}=require('../middlewares/authHandler')

router.post('/create',register)
router.post('/login',login)
router.put('/update',update)
router.route('/profile').get(protectRoute,getUserProfile).put(protectRoute,update)

module.exports=router;