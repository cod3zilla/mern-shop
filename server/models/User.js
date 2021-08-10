const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const UserSchema= mongoose.Schema({
            name:{
                type:String,
                require:true
            },
            email:{
                type:String,
                require:true
            },
            password:{
                type:String,
                require:true
            },
            isAdmin:{
                type:Boolean,
                default:false
            }
},{timestamps:true})

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

UserSchema.methods.comparePassword= async function(clientPassword){
    return await bcrypt.compare(clientPassword, this.password)
}

UserSchema.methods.generateToken= function(id){
    const token= jwt.sign({ id },process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRY})
    return token
}

const User=mongoose.model('User',UserSchema)

module.exports=User;