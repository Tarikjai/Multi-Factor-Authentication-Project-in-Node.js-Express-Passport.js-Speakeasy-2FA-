import User from '../models/user.js'
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken' 

const register = async(req,res)=>{
    try {
        const { username, password}  =   req.body
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser =  new User({
            username,
            password:hashedPassword,
            isMfaActive :false  
        })
        console.log("New User : ", newUser)
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({error:'Error registering  user',  message: error.message})
    }
}

const login = async(req,res)=>{
    console.log(`The authenticated user is: ${req.user}`)
    res.status(200).json({
        message :"User logged succefuly",
        username: req.user.username,
        isMfaActive: req.user.isMfaActive
    })
}

const authStatus = async(req,res)=>{

}

const logout = async(req,res)=>{

}

const setup2FA = async(req,res)=>{

}
const verify = async(req,res)=>{

}
const reset2FA = async(req,res)=>{

}
export  {register , login, authStatus, logout, setup2FA, verify, reset2FA}