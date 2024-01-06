const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//sign up user

const signupUser = async(req, res) => {
    const {email, password} = req.body 
    try{
        const user = await User.signup(email, password)
        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const token  = createToken(user._id)
        res.status(200).json({email, token})
    }catch(err){
        res.status(404).json(err.message)
    }
}


module.exports = {signupUser, loginUser}