import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title required"],
        unique: true
    },
    content: {
        type: String,
        required: [true, "content required"]
    },
    slug: {
        type: String,
        unique: true
    },
    userId:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"" ,
    },
},{timestamps:true});
const Post=mongoose.model("Post",PostSchema);
export default Post;