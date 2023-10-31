import express from "express"
import { booking, login, search, signup ,google, updateUser} from "../Controllers/viewersController.js"
import { verifyToken } from "../utils/verifyUser.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/search",search)
router.post("/booking",booking)
// router.post("/booking/:uid/:tid",booking)
router.post('/google',google)
router.post("/update/:id",verifyToken,updateUser)

export default router