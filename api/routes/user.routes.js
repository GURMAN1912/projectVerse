import express from'express'
import { addFollower, deleteUser, getUser, removeFollower, signOut, test, updateUser } from '../controller/user.conroller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { get } from 'mongoose';

const router=express.Router();

router.get('/test',test);
// router.post("sign-up")
router.get("/get-user/:userId",getUser)
router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userId",verifyToken,deleteUser)
router.post("/sign-out",signOut);
// Route to follow a user
router.put('/:userId/follow', addFollower);

// Route to unfollow a user
router.put('/:userId/unfollow', removeFollower);
export default router;