import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js";
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";
dotenv.config();
// es9ySfa792meEWdn
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRouter);
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message=err.message||'Internal Server Error';
  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
