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
        if(req.body.summary.length>300){
            return next(errorHandler(400,"summary must be less than 300 characters"));
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
        console.log(req.params.userId)
        const updatedUser=await User.findByIdAndUpdate(req.params.userId,{$set:{
            username:req.body.username,
            email:req.body.email,
            name:req.body.name,
            password:req.body.password,
            profilePicture:req.body.profilePic,
            bio:req.body.bio,
            skills:req.body.skills,
            followers:req.body.followers,
            followings:req.body.followings,
            organization:req.body.organization,
            qualification:req.body.qualification,
            location:req.body.location,
            summary:req.body.summary,
            likes:req.body.likes,
            experience:req.body.experience,
            profile:req.body.profile,
            github:req.body.github,
            linkedin:req.body.linkedin,
            x:req.body.x,

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
export const getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.userId);
        const {password,...rest}=user._doc;
        res.status(200).json(rest);
    }
    catch(error){
        next(error);
    }
}
export const addFollower = async (req, res, next) => {
  try {
    const {userId,currentUserId}=req.body;
    if (userId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);
    if(!userToFollow || !currentUser){
      return res.status(400).json({message:"User not found"})
    }
    console.log(currentUser.followings)

    // Check if already following
    if (!userToFollow.followers.includes(currentUserId)) {

      // Add to followers list of userToFollow
      userToFollow.followers.push(currentUserId);

      // Add to followings list of currentUser
      currentUser.followings.push(userId);

      // Save both users
      await userToFollow.save();
      await currentUser.save();

      res.status(200).json({currentUser});
    } else {
      res.status(400).json({ message: "You are already following this user" });
    }
  } catch (error) {
    next(error);
  }
};

// Remove follower/following logic
export const removeFollower = async (req, res, next) => {
  try {
    const {userId,currentUserId}=req.body;


    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    // Check if currently following
    if (userToUnfollow.followers.includes(currentUserId)) {
      // Remove from followers list of userToUnfollow
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (id) => id.toString() !== currentUserId.toString()
      );

      // Remove from followings list of currentUser
      currentUser.followings = currentUser.followings.filter(
        (id) => id.toString() !== userId.toString()
      );

      // Save both users
      await userToUnfollow.save();
      await currentUser.save();

      res.status(200).json({ currentUser });
    } else {
      res.status(400).json({ message: "You are not following this user" });
    }
  } catch (error) {
    next(error);
  }
};
  