import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, deletePost, editPost, getPost, getPosts } from '../controller/post.controller.js';

const router = express.Router();

router.post('/create',verifyToken, createPost);
router.get('/getposts',getPosts)
router.get('/get-post/:postId',getPost)
router.put('/edit-post/:postId',verifyToken,editPost)
router.delete('/delete-post/:postId',verifyToken,deletePost)
export default router;