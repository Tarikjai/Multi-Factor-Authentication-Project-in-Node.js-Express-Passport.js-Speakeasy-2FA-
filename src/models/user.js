import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

        username:{
            type: String,
            required : true
        },
        password:{
            type:String,
            required :true
        },
        isMfaActive:{
            type: Boolean,
            required:false,
        },
        twoFactorSecret :{
            type:String
        }
    },
    {
         timestamps: true
    })

const User = mongoose.model("user", userSchema)


export default User
