import express from 'express'
import {hello,registerUser,login} from './../controller/register-user.js'





const router = express.Router()

router.get('/',hello)

router.post('/register-user',registerUser)
router.post('/login',login)


export default router