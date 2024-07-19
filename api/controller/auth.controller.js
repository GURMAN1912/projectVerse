import brcyptjs from "bcryptjs"
import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
export const SignUp=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password || username===""||email===""||password===""){
        next(errorHandler(400,"all feilds are requied"))
    }
    const hashedPassword=brcyptjs.hashSync(password,10);
    const newUser=new User({
        username,
        email,
        password:hashedPassword
    })

    try {
        await newUser.save();  
        res.json("sign up successfull") 
        
    } catch (error) {
        next(error)
    }
}