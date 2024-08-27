import Post from '../model/post.model.js';
import { errorHandler } from '../utils/error.js';
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