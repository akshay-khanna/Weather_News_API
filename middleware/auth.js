const User= require("../models/user")
const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
try{
    const token=req.header("Authorization").replace("Bearer ","")
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    //console.log(token)
    //console.log(decoded._id)
    const user=await User.findOne({_id:decoded._id,"tokens.token":token})
    //console.log(user.tokens)
    if(!user){
        throw new Error()
    }
    req.user=user
    req.token=token
    next()
}catch(e){
    res.status(401).send("Please Authenticate")
}
}
module.exports=auth