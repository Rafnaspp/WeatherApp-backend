import mongoose, { Schema, trusted } from "mongoose";

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
    },
    email:{
         type:String,
         required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    }
})

const User = mongoose.model('USERS',userSchema)

export default User