import express from "express"
import { protector } from "../middleware/auth.middleware.js"
import { getmessages, getUsersForSidebar, sendMessage } from "../controllers/messg.controller.js"

const router= express.Router()

router.get("/users",protector,getUsersForSidebar)
router.get("/personal/:id", protector,getmessages)
router.post("/send/:reciverId",protector,sendMessage)

export default router