const express = require("express");
const router = express.Router();
const SendEmail = require("../controller/email");




//Route 1: Send email

router.post('/sendemail',async(req,res)=>{
SendEmail(req,res)


})


module.exports = router;