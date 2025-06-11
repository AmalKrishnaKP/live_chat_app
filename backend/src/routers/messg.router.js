import express from "express"
import { protector } from "../middleware/auth.middleware.js"
import { getmessages, getUsersForSidebar } from "../controllers/messg.controller.js"

const router= express.Router()

router.get("/users",protector,getUsersForSidebar)
router.get("/personal/:id", protector,getmessages)

export default router