const jwt=require('jsonwebtoken')
const User=require('../models/User')

exports.protectRoute= async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))    
    try {
        token=req.headers.authorization.split(" ")[1]
        const decode=jwt.verify(token,process.env.JWT_KEY)
        req.user=await User.findById(decode.id).select("-password")
        next()
    } catch (error) {
        if(!token){
            res.status(401).json({
                message:'Not authorized'
            })
        }
        console.log(error)
    }
    
}

