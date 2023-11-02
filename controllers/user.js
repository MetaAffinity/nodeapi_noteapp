import { sendCookie } from "../cookieToken.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import ErrorHandler from "../middlewares/error.js";





export const allUsers = async (req, res) =>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
}

//register
export const register = async (req, res) =>{
    const { name, email, password } = req.body; 
    console.log(req.body)

   let user  = await User.findOne({email});

   if(user) return next(new ErrorHandler("User Already Exist",400))
    const hashPassword = await bcrypt.hash(password,10);
    user = await User.create({name, email, password:hashPassword});

   sendCookie(user, res,"Registed Successfully",200)
}

// Login
export const login = async (req, res, next) =>{
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email }).select("+password")

        if(!user) return next(new ErrorHandler("Invalid Email or Password",401))
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch) return next(new ErrorHandler("Invalid Password",400))

// if empty
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message : "Please provide email and password"
               })
            }
            sendCookie(user,res,`Welcome back, ${user.name}`,200)
        } catch (error) {
        next(error);
        }
}

// my profile
export const myProfile = async (req, res) =>{
    res.status(200).json({
        success: true,
        user: req.user
    })
}

export const logout = (req, res) =>{
    res.status(200)
    .cookie("token","",{
        expires: new Date(Date.now()),
        //in case of cors, if backend and frontend are on different domains,
        sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure:process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success:true,
        message:"Logged Out",
        user:req.user
    })
}