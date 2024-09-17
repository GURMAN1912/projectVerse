import { parse } from 'dotenv';
import Post from '../model/post.model.js';
import { errorHandler } from '../utils/error.js';
import e from 'express';
import User from '../model/user.model.js';
export const createPost=async(req,res,next)=>{
    console.log(req.body);
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,"title and content required"));
    }
    const slug=req.body.title.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9-]/g, "");
    try{
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            return next(errorHandler(400, "A post with this title already exists"));
        }
        const post=new Post({
            title:req.body.title,
            content:req.body.content,
            category:req.body.category,
            githublink:req.body.githublink,
            liveLink:req.body.liveLink,
            slug:slug,
            authorProfilePicture:req.body.authorProfilePicture,
            author:req.body.author,
            skills:req.body.skills,
            images:req.body.images,
            userId:req.user.id
        });
        const savedPost=await post.save();
        res.status(201).json(savedPost);
    }
    catch(err){
        return next(errorHandler(500,err.message));
    }
}
export const getPosts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
  
      // Build the query object dynamically based on request query params
      const queryConditions = {
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
            { category: { $regex: req.query.searchTerm, $options: 'i' } },
            { skills: { $regex: req.query.searchTerm, $options: 'i' } },
            { author: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      };
  
      // Fetch posts based on the query conditions, sorting, and pagination
      const posts = await Post.find(queryConditions)
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      // Fetch total posts count
      const totalPosts = await Post.countDocuments(queryConditions);
  
      // Calculate the date one month ago
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
      // Count posts created in the last month
      const lastMonthPosts = await Post.countDocuments({
        ...queryConditions,
        createdAt: { $gte: oneMonthAgo },
      });
  
      // Return data with total and monthly count if userId is provided
      if (req.query.userId) {
        return res.status(200).json({ posts, totalPosts, lastMonthPosts });
      }
  
      // Return only posts when userId is not in the query
      return res.status(200).json(posts);
    } catch (err) {
      next(errorHandler(500, err.message));
    }
  };
  
export const getPost=async(req,res,next)=>{
    try{
        const post=await Post.findById(req.params.postId);
        if(!post){
            return next(errorHandler(404,"post not found"));
        }
        res.status(200).json({post});
    }
    catch(err){
        next(errorHandler(500,err.message));
    }
}
export const editPost=async(req,res,next)=>{
    try{
        const post=await Post.findById(req.params.postId);
        console.log(post);
        if(!post){
            return next(errorHandler(404,"post not found"));
        }
        post.title=req.body.title||post.title;
        post.content=req.body.content||post.content;
        post.category=req.body.category||post.category;
        post.githublink=req.body.githublink||post.githublink;
        post.liveLink=req.body.liveLink||post.liveLink; 
        post.authorProfilePicture=req.body.authorProfilePicture||post.authorProfilePicture;
        post.author=req.body.author||post.author;
        post.images=req.body.images||post.images;
        post.skills=req.body.skills||post.skills;
        if (req.body.likes) {
            post.likes = req.body.likes;
          }
      
          if (req.body.comments) {
            post.comments = req.body.comments;
          }
        const updatedPost=await post.save();
        res.status(200).json(updatedPost);
    }
    catch(err){
        next(errorHandler(500,err.message));
    }   
}
export const deletePost=async(req,res,next)=>{
    try{
        console.log(req.params.postId);
        const post=await Post.findById(req.params.postId);
        if(!post){
            return next(errorHandler(404,"post not found"));
        }
        if(post.userId.toString()!==req.user.id){
            return next(errorHandler(403,"you are not authorized to delete this post"));
        }
        await post.deleteOne();
        res.status(200).json({message:"post deleted"});
    }
    catch(err){
        next(errorHandler(500,err.message));
    }
}

export const postComment=async(req,res,next)=>{
    console.log(req.body);
    try{
        const post=await Post.findById(req.params.postId);
        if(!post){
            return next(errorHandler(404,"post not found"));
        }
        const { username,profilePicture, content } = req.body.comments;
        if (!username || !content) {
          return next(errorHandler(400, "Invalid comment data"));
        }
    
        const comment = {
            userId: req.user.id,
          username: username,
            profilePicture: profilePicture,
          content: content,
          createdAt: new Date(), // Add the current timestamp
        };
    
        post.comments.push(comment);
  
        const updatedPost = await post.save();
    
        res.status(200).json({ message: "Comment added successfully", comments: updatedPost.comments });
      }
    catch(err){
        next(errorHandler(500,err.message));
    }
}
export const postFeed=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id
            ).select("followings");
            console.log(user);
        const posts=await Post.find({userId:{ $in: [req.user.id, ...user.followings] }});
        const sortedPost = posts.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          });
        res.status(200).json(posts);
    }
    catch(err){
        next(errorHandler(500,err.message));
    }
}