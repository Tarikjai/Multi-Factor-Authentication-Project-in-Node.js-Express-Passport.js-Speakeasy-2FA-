import express from "express"
import session from "express-session"
import passport from "passport"
import 'dotenv/config'
import cors from "cors"
import dbConnect from './config/dbConnect.js'
import authRoutes   from './routes/authRoutes.js'
import "./config/passportConfig.js"

const app = express()
dbConnect()

//middlewares
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ limit: "100mb", extended: true}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : false,
    cookie:{
        maxAge: 6000*60
    }
}))
app.use(passport.initialize());
app.use(passport.session())

// Routes
app.use("/api/auth",authRoutes)



// Listen
const PORT = process.env.PORT
app.listen(PORT, (req,res)=>{
    console.log(`server running on port: ${PORT}`)
})