const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware/authMiddleware');

const User = require('../models/userModel')
const secretKey = 'YourSecretKey';
router.get('/:emailId',withAuth, async (req,res)=>{
    try{
        const users = await User.findOne({emailId:req.params.emailId});
        res.json(users)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }
})

router.post('/login', async (req, res) => {
    const jsonData = req.body;
    // const user = { id: 1, username: 'example' };
    try{
        const user = await User.findOne({emailId:jsonData.emailId});
        if(user==null){
            return res.status(404).json({message:'User Not Found'});
        }
        const isValid = await bcrypt.compare(jsonData.password,user.password);
        if(isValid){
            const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ token: token });
            // res.json({token:token}).status(200)
        }
        else{
            return res.status(401).json({message:'Invalid Password'});
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }
});


router.post('/',async (req,res)=>{
    console.log({body:req.body})
    const user = new User({
        name: req.body.name,
        emailId:req.body.emailId,
        password:req.body.password,
    })
    try{
        const users = await User.findOne({emailId:req.params.emailId});
        if(users){
            req.status(401).json({msg:"User already exists"});
        }
        const newUser = await user.save();  
        res.status(201).json({msg:"User Created"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

module.exports = router 