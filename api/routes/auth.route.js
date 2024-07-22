import express from 'express'
import { google, SignIn, SignUp } from '../controller/auth.controller.js';
const router=express.Router();
router.post('/sign-up',SignUp)
router.post("/sign-in",SignIn)
router.post('/google',google);
export default router;