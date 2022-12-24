import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
const app = express()
dotenv.config()
import authRoute from  '../server/router/auth.js'

const DB = process.env.DB


mongoose.connect(DB,()=>{
    console.log('connected mongoose');
})

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use('/',authRoute)


app.listen(process.env.PORT,()=>{
    console.log('connencted at 4000');
})