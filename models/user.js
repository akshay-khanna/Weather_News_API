const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jwt= require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
        },
    email:{
        type: String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email id provided is invalid')
            }
        },
        lowercase: true,
        trim: true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){       
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain word password in it')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
          
},{
    timestamps:true
})


userSchema.methods.toJSON=function()
{
    const user=this
    const userObject =user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
userSchema.methods.generateAuthToken=async function (){
 const user=this
 const token=await jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET) 
 user.tokens=user.tokens.concat({token})
 await user.save()
return token
}
userSchema.statics.findByCredentials=async (email,password)=>{ 
    const user=await User.findOne({email})

const isValidMatch= await bcryptjs.compare(password,user.password)

if(!isValidMatch){
    throw new Error('Unable to login')  
}

    return user
}
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){ 
        //console.log("Before Modification Password:"+user.password)
        user.password=await bcryptjs.hash(user.password,8)
    }
    next()
})
userSchema.pre('remove',async function(next){
    //console.log("Before Delete")
    const user=this
    try{
        await Task.deleteMany({owner:user._id})
    }
    catch(e){
        throw new Error(e)
    }

    next()
})
const User =mongoose.model('User',userSchema)
module.exports=User
