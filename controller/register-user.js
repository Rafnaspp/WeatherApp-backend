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
    const oldUser = await userSchema.findOne({email:req.body.email})
    console.log(oldUser,'olduser');
    if(oldUser){
        res.status(200).json({message:"user already exist"})
    }
    else
    {const salt = await genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
    const user = new userSchema(req.body)
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET_KEY,{expiresIn:"1hr"})
    console.log("ttoken;",token);
    user.save()
    res.status(200).json({user,token})}
}

export const login =async(req,res)=>{
    const user = await userSchema.findOne({email:req.body.email})
    if(user){
    const validate =await bcrypt.compare(req.body.password, user.password)
    if(validate){
        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET_KEY,{expiresIn:"1hr"})
        const {password,confirmpassword,...userDetails} = user._doc
        res.status(200).json({userDetails,token})
        console.log(userDetails);
        console.log('success');
        console.log(token);
    }else{
    res.status(400).json("wrong password")
    console.log('USERRLOGIN',user);
    console.log('validatepass',validate);}
}
else{
    res.status(404).json({message:"user does not found"})
    console.log("user nor o;fund");
}
}