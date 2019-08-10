const express=require("express")
const users=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt= require('bcryptjs');
const userModel=require('../models/index');
const User=userModel.User;
process.env.SECRET_KEY='secret'
users.post('/register',(req,res,next)=>{
    const today=new Date()
    const userData={
        email:req.body.email,
        password:req.body.password,
        created:today
    }
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(
        (user)=>{
            if(!user){
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    userData.password=hash,
                    User.create(userData).then(
                        (user)=>{
                            res.json({status:user.email+" registered"})
                        }
                    )
                })
            }
            else{
                res.send({error: "user already exists"})
            }
        }
    ).catch((err)=>{
        res.send({error:"Request failed"})
    })
})
users.post('/login',(req,res,next)=>{
   User.findOne({
       where:{
           email:req.body.email
       }
   }).then((user)=>{
       if(user){
           if(bcrypt.compareSync(req.body.password,user.password)){
           let output={
               email:user.email,
           }
           let token=jwt.sign(output,process.env.SECRET_KEY,{expiresIn:1440});
           res.send({
               status:"Successfully login"
           });

       }
       else{
           res.send({error:"Password is wrong"})
       }
    }
    else{
        res.send({error:"The user does not exist"})
    }
   }).catch((error)=>{
        res.send({error:"Request failed"})
   })


})
module.exports=users
