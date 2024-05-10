const express = require('express')


const router = new express.Router()
const user=require('../Controllers/userController')
const { jwtMiddleware } =require('../middlewares/jwtMiddleware')



router.post('/signup',user.signUp)

router.post('/signin',user.login)

router.post(`/add-booking/:id`,jwtMiddleware,user.addBooking)

module.exports=router