import express from "express"
import { protector } from "../middleware/auth.middleware.js"
import { getUsersForSidebar } from "../controllers/messg.controller.js"

const router= express.Router()

router.get("/users",protector,getUsersForSidebar)

export default router