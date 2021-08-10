const jwt=require('jsonwebtoken')

const authToken= function(id){    
const token = jwt.sign({ id }, process.env.JWT_KEY,{
    expiresIn:'1d'
})

}

module.exports=authToken