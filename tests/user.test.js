const request=require('supertest')
const  app= require('../app')
const  User= require('../models/user')
const{userOneId,userOne,userTwo,userTwoId,setupDatabase}=require('./fixtures/db')
beforeEach(setupDatabase)
test("Should Sign up a new user",async()=>{ 
     const response=await request(app).post("/signup").send({
         name:"John Doe",
         email:"johndoe@gmail.com",
         password:"MyPass777!",
     }).expect(201)

     const user=await User.findById(response.body.user._id)
     //console.log(user)
     expect(user).not.toBeNull()
     expect(response.body).toMatchObject({
         user:{
            name:"John Doe",
            email:"johndoe@gmail.com"
         },
         token:user.tokens[0].token
     })
     // console.log(user.password)
     expect(user.password).not.toBe('MyPass777!')
}) 

test("Should login existing user",async()=>{ 
   const response= await request(app).post("/login").send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
   const user=await User.findById(response.body.user._id)
   expect(user.tokens[1].token).toBe(response.body.token)
}) 

test("Should not login non existing user",async()=>{ 
    await request(app).post("/login").send({
        name:"Akshay",
        email:userOne.email,
        password:"passwFaulty"
    }).expect(400)
   
}) 

test("Should be Able to call news api for logged in user",async()=>{
    //console.log(userOne.tokens[0].token)
    await request(app)
    .get('/news')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test("Should not be able to call news api for unauthorized user",async()=>{
    //console.log(userOne.tokens[0].token)
    await request(app)
    .get('/news')
    .send()
    .expect(401)
})



test("Should call weather api for non authenticated user",async()=>{
    //console.log(userOne.tokens[0].token)
    await request(app)
    .get('/weather')
    .expect(200)
})

test("Should be able to logout an authenticated user",async()=>{
    //console.log(userOne.tokens[0].token)
    await request(app)
    .post('/logout')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .expect(200)
})


test("Should be able to logout an authenticated user 2",async()=>{
    //console.log(userOne.tokens[0].token)
    await request(app)
    .post('/logout')
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .expect(200)
})

