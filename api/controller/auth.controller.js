import brcyptjs from "bcryptjs"
import User from "../model/user.model.js";
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js";
export const SignUp=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password || username===""||email===""||password===""){
        next(errorHandler(400,"all feilds are requied"))
    }
    const isUqine=await User.findOne({username,email});
    if(isUqine){
        next(errorHandler(400,"username or email is already taken"))
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
export const SignIn=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password || email===""||password===""){
        next(errorHandler(400,"all feilds are requied"))
    }
    try {
        const validUser=await User.findOne({email});
        if(!validUser){
           return errorHandler(400,"User not find");
        }
        const validPassword=brcyptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return errorHandler(400,"wrong password");

        }
        const token=jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET);
        const {password:pass,...rest}=validUser._doc;
        res.status(200).cookie("access_token",token,{
            httpOnly:true
        }).json(rest)
    } catch (error) {
        next(error)
    }
}
export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id,isAdmin:user.isAdmin },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = brcyptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id ,isAdmin:newUser.isAdmin},
          process.env.JWT_SECRET
        );
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };