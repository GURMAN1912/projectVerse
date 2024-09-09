import { parse } from 'dotenv';
import Post from '../model/post.model.js';
import { errorHandler } from '../utils/error.js';
import e from 'express';
export const createPost=async(req,res,next)=>{
    // console.log(req.body);
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
            slug:slug,
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
export  const getPosts=async(req,res,next)=>{
    try{
        const startIndex=parseInt(req.query.startIndex)||0;
        const limit=parseInt(req.query.limit)||9;
        const sortDirection = req.query.order==='asc'?1:-1;
        const posts=await Post.find({
            ...(req.query.userId &&{userId:req.query.userId}),
            ...(req.query.category &&{category:req.query.category}),
            ...(req.query.slug &&{slug:req.query.slug}),
            ...(req.query.category &&{category:req.query.category}),
            ...(req.query.postId &&{_id:req.query.postId}),
            ...(req.query.searchTerm &&{
                $or:[
                    {title:{$regex:req.query.searchTerm,$options:'i'}},
                    {content:{$regex:req.query.searchTerm,$options:'i'}},
                ],

            }),
    }).sort({createdAt:sortDirection}).skip(startIndex).limit(limit);
    const totalPosts=await Post.countDocuments({
        ...(req.query.userId &&{userId:req.query.userId}),
    })
    const now=new Date();
    const oneMonthAgo   = new Date(now.setMonth(now.getFullYear(),now.getMonth() - 1,now.getDate()));
    const lastMonthPosts=await Post.countDocuments({
        createdAt:{$gte:oneMonthAgo},
        ...(req.query.userId &&{userId:req.query.userId}),
    })
    if(req.query.userId){
        return res.status(200).json({posts,totalPosts,lastMonthPosts});
    }
    return res.status(200).json(posts);
}
    catch(err){
        next(errorHandler(500,err.message));
    }
}
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
        if(!post){
            return next(errorHandler(404,"post not found"));
        }
        if(post.userId.toString()!==req.user.id){
            return next(errorHandler(403,"you are not authorized to edit this post"));
        }
        post.title=req.body.title||post.title;
        post.content=req.body.content||post.content;
        post.category=req.body.category||post.category;
        post.images=req.body.images||post.images;
        const updatedPost=await post.save();
        res.status(200).json("post updated");
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