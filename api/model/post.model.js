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
    category: {
        type: String,
        required: [true, "catagory required"]
    },
    slug: {
        type: String,
        unique: true
    },
    userId:{
        type:String,
        required:true,
    },
    images:{
        type:Array,
        default:"" ,
    },
    comments: {
        type: [
          {
            userId: {
              type: String,
              required: true, // You can make this required if every comment must have a userId
            },
            content: {
              type: String,
              required: true, // You can also make the content required
            },
            createdAt: {
              type: Date,
              default: Date.now, // Automatically set the comment creation date
            }
          }
        ],
        default: [], // Empty array as default
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    likes:{
        type:[String],
        default:[],
    },
},{timestamps:true});
const Post=mongoose.model("Post",PostSchema);
export default Post;