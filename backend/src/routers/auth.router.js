import express from 'express'

import { protector } from '../middleware/auth.middleware.js';
import { login, logout, signup, update,checkAuth } from '../controllers/auth.controller.js';

const router=express.Router()

router.post("/login",login)

router.post("/signup",signup)

router.post("/logout",logout)

router.put("/update-profile",protector,update)

router.get("/check-auth",protector,checkAuth)

export default router