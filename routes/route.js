const express= require('express')
const User=require('../models/user');
const auth=require('../middleware/auth')
const { weatherAPI } = require('../utils/weatherapi');
const { news_API } = require('../utils/newsapi');
const router=new express.Router()
const cacheMiddleware=require('../middleware/cache')


router.post("/signup",async (req,res)=>{
    const user=new User(req.body)
    try{
        const token=await user.generateAuthToken()
        await user.save()
        res.status(201).send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
    
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
    })


router.post('/login',async(req,res)=>{
    try{
        //console.log(req.body)
        //console.log(req.body.email)
        //console.log(req.body.password)
        const user=await User.findByCredentials(req.body.email,req.body.password)
        //console.log(user._id)
        const token=await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        //console.log("reach Here")
        res.status(400).send(e)
    }
})


router.post('/logout',auth,async (req,res)=>{
    try{
    req.user.tokens=req.user.tokens.filter((userObj)=>{
       //console.log(userObj.token!==req.token)
       //console.log(userObj.token)
       //console.log(req.token)
       return (userObj.token!==req.token)
    })
    await req.user.save()
    res.send()

}
catch(e){
    res.status(500).send()
}
})



router.get("/weather",cacheMiddleware(10),async (req,res)=>{
    let response;
    try{
         response = await weatherAPI();
        //console.log(response);
        JSON.stringify(response);
        if(!response && !response.errorMsg) {
            throw new Error()
        }
        res.status(200).send(response)
    }
    catch(e)
    {
        //console.log(e)
        res.status(404).send(response)
    }
  ;

});

router.get("/news",auth,cacheMiddleware(10),async (req,res)=>{
    let response;
    let search=undefined;
    //console.log(req.query);
    if(req.query.search){
        search=req.query.search;
    }
    try{
         response = await news_API(search);
        //console.log(response);
        if(!response && !response.errorMsg) {
            throw new Error()
        }
        res.status(200).send(response)
    }
    catch(e)
    {
        res.status(404).send(response)
    }
  ;

});

module.exports=router