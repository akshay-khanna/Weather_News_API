const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>{
    //console.log('Connection Successful!!')
}).catch((error)=>{
    console.log('Connection Failed!!!')
})
