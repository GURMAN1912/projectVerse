import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:"Hey there! I am using projectVerse.",
    },
    skills:{
        type:Array,
        default:[],
    },
    profilePicture: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      },
    followers:{
        type:Array,
        default:[],
    },
    followings:{
        type:Array,
        default:[],
    },
    github:{
        type:String,
        default:"",
    },
    linkedin:{
        type:String,
        default:"",
    },
    x:{
        type:String,
        default:"",
    },
    name:{
        type:String,
        default:"",
        max:50,
    },
    organization:{
        type:String,
        default:"",
        max:50,
    },
    qualification:{
        type:String,
        default:"",
        max:50,
    },
    location:{
        type:String,
        default:"",
        max:50,
    },
    experience:{
        type:Number,
        default:"",
    },
    profile:{
        type:String,
        default:"",
    },
    summary:{
        type:String,
        default:"",
    },


    
},{timestamps:true});
const User=new mongoose.model("User",userSchema);
export default User;