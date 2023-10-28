import express from "express"
import { allowEdit, prodDet, vendorApproval, vendorEatables, vendorEdit, vendorFacilities, vendorRegistration, vendorSignup, vendorTimings } from "../Controllers/vendorController.js"


const router=express.Router()

router.post("/signup",vendorSignup)
// router.get("/registration/:id",vendorRegistration)
router.put("/registration/:id",vendorRegistration)
router.put("/facilities/:id",vendorFacilities)
router.put("/eatables/:id",vendorEatables)
router.put("/timings/:id",vendorTimings)
router.put("/approval/:id",vendorApproval)
router.put("/venderEdit/:id",allowEdit)
router.get("/:id",prodDet)

export default router