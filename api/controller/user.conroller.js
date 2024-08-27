import brcyptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import User from "../model/user.model.js";
export const test=(req,res)=>{
    res.json({message:"Api is working"});
}
export const updateUser=async(req,res,next)=>{
    if(req.user.id!==req.params.userId){
        return next(errorHandler(401,"you can't update other user's data"));

    }
    if(req.body.password){
        if(req.body.password.length<6){
            return next(errorHandler(400,"password must be at least 6 characters"));
        }
        req.body.password=await brcyptjs.hash(req.body.password,10);
    }
    if(req.body.username){
        if(req.body.username.length<7 ||req.body.username.length>20){
            return next(errorHandler(500,"username must be between 7 and 20 characters"));
        }
        if(req.body.username.includes(" ")){
            return next(errorHandler(400,"username can't contain space"));
        }
        if(req.body.username!==req.body.username.toLowerCase()){
            return next(errorHandler(400,"username must be in lowercase"));
        }
        if(!req.body.username.match(/^[a-z0-9]+$/)){
            return next(errorHandler(400,"username must contain only alphabets and numbers"));
        }
    }
    try{
        console.log(req.body.profilePic)
        const updatedUser=await User.findByIdAndUpdate(req.params.userId,{$set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            profilePicture:req.body.profilePic,
        }},{new:true});
        const {password,...rest}=updatedUser._doc;
        res.status(200).json(rest); 
    }
    catch(error){
        next(error);
    }

}
export const deleteUser=async(req,res,next)=>{
    if(req.user.id!==req.params.userId){
        return next(errorHandler(401,"you can't delete other user's data"));
    }
    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({message:"user deleted successfully"});
    }
    catch(error){
        next(error);
    }
}
export const signOut=(req,res,next)=>{
    try{
        console.log(req)
        res.clearCookie("access_token").status(200).json("User has Been sign out")
    }
    catch(error){
        next(error)
    }
}