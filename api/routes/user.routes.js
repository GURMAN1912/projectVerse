import express from'express'
import { test } from '../controller/user.conroller.js';

const router=express.Router();

router.get('/test',test);
// router.post("sign-up")

export default router;