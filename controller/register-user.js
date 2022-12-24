import userSchema from '../model/userSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt, { genSalt } from 'bcrypt'

export const hello =(req,res)=>{
    res.send("Hellor worl controller")
}

export const registerUser = async(req,res)=>{

    console.log("add user called");
    console.log('bodyyy',req.body);
    console.log('bodyyy');
    const salt = await genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
    const user = new userSchema(req.body)
    const token = jwt.sign({
        username:user.firstname,id:user._id
    },process.env.JWT_SECRET_KEY,{expiresIn:"1hr"})
    console.log("ttoken;",token);
    user.save()
    res.status(200).json({user,token})
}

export const login =async(req,res)=>{
    const user = await userSchema.findOne({email:req.body.email})
    const validate =await bcrypt.compare(req.body.password, user.password)
    if(validate){
        res.status(200).json(user)
    }
    res.status(400).json("wrong password")
    console.log('USERRLOGIN',user);
    console.log('validatepass',validate);
}