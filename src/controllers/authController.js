import User from '../models/user.js'
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'      
import speakeasy from "speakeasy"
import qrCode from "qrcode"


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
    if (req.user) {
        res.status(200).json({
            message :"User loged in succefully",
            username: req.user.username,
            isMfaActive: req.user.isMfaActive
        })
    } else {
        res.status(401).json({message: "Unauthorizd user"})
    }
}

const logout = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized user" });
    }
    req.logout((err) => {
        if (err) {
            return res.status(401).json({ message: "User not logged in" });
        }
        res.status(200).json({ message: "Logout successful" });
    });
};

const setup2FA = async(req,res)=>{
   try {
    console.log("The req.user is : ", req.user)
    const user = req.user
    const secret = speakeasy.generateSecret();
    console.log("The secret object is : ", secret)  
    user.twoFactorSecret = secret.base32
    user.isMfaActive= true
    await user.save()
    const url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: `${req.user.username}`,
        issuer: "www.jaidani.com",
        encoding : "base32"
    })
    const qrImageUrl = await qrCode.toDataURL(url)
    res.status(200).json({
        secret : secret.base32,
        qrCode:qrImageUrl
    })
   } catch (error) {
    res.status(500).json({error:"Error setting up 2FA",message: error})
   }
}
const verify = async(req,res)=>{

}
const reset2FA = async(req,res)=>{

}
export  {register , login, authStatus, logout, setup2FA, verify, reset2FA}