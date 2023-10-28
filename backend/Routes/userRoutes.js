import express from "express"
import { booking, login, search, signup } from "../Controllers/viewersController.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/search",search)
router.post("/booking/:uid/:tid",booking)


export default router