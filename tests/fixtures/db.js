const jwt = require('jsonwebtoken')
const mongoose=require('mongoose')
const  User= require('../../models/user')


const userOneId=new mongoose.Types.ObjectId
const userOne={
    _id:userOneId,
    name:"testUser",
    email:"testUser1@gmail.com",
    password:"testUserPass@123",
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

const userTwoId=new mongoose.Types.ObjectId
const userTwo={
    _id:userTwoId,
    name:"testUser2",
    email:"testUser2@gmail.com",
    password:"testUser2Pass@123",
    tokens:[{
        token:jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
    }]
}


const setupDatabase=async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}


module.exports={
    userOneId,
    userOne,
    setupDatabase,
    userTwo,
    userTwoId
}