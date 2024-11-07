const express = require("express")
const mongoose= require("mongoose")
const path= require('path')
const PORT = 5020;

const app= express();
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/Customers')
const db= mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection successful")
})

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    courses:String
})

const Users= mongoose.model("data",userSchema)


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post',async (req,res)=>{
    const{name,email, address,courses}=req.body
    const user=new Users({
        name,
        email,
        address,
        courses
    })
    await user.save()
    console.log(user)
    res.send("form submitted")
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
