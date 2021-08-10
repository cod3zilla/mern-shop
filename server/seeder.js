const mongoose=require('mongoose')
require('dotenv').config()
const users=require('./config/data/users')
const products=require('./config/data/products')
const User=require('./models/User')
const Product=require('./models/Product')
const Order=require('./models/Order')
const connectDB=require('./config/dbconfig')

connectDB()

const importData= async()=>{
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
        const createUser= await User.insertMany(users)
        const adminUser= createUser[0]._id
        const sampleData=products.map(product =>{
            return {...product,user:adminUser}
        })
        await Product.insertMany(sampleData)
        console.log('Data imported successfully!!')
        process.exit()

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const destroyData=async()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log('Data destroyed successfully!!')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2]==="-destroy"){
    destroyData()
}else{
    importData()
}