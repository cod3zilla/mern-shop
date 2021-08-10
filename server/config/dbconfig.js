const mongoose=require('mongoose')
require('dotenv').config()

const connectDB= async ()=>{    
    try {
        const connection=await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true, useFindAndModify:true})
        console.log(`db is connected:${connection.connection.host}`)
    } catch (error) {
        console.log(`Error:${error.message}`)
        process.exit(1)
    }
}

module.exports=connectDB;