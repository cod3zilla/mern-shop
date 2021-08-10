const mongoose=require('mongoose')
const User=require('../models/User')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

exports.register= async (req, res, next)=>{
    const {name,email,isAdmin,password}=req.body 
    
        const user= await User.create({name,email,isAdmin,password})
            res.status(201).json({
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:user.generateToken(user._id)
            })     
}
    

exports.login= async(req, res)=>{
    const {email,password}=req.body
    const user= await User.findOne({email})
    if(user){
        const matchPassword= await user.comparePassword(password)
        res.json({
            id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:user.generateToken(user._id)
        })
    }else{
        res.status(404).json({message:'user not found!'})
    }   
}
exports.update= async(req, res)=>{
    const {name, email, password}=req.body
    const user= await User.findById(req.user._id)
    if(user){
        user.name=name || user.name
        user.email=email || user.email
        if(password){
            user.password=password
        }
        const updateUser= await user.save()
        res.json({
            success:true,
            id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
            token:updateUser.generateToken(updateUser._id)
            
        })
    }else{
        res.status(404).json({
            message:'user update failed!!'
        })
    }

}

exports.getUserProfile= async (req, res)=>{
    const user= await User.findById(req.user._id)
    if(user){
        res.json({
                id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin
        })
    }else{
        res.status(404).json({
            message:'user not found.'
        })
    }
}