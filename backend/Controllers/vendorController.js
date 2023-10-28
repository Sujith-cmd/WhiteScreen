
import User from "../Model/Usermodel.js"
import Vendor from "../Model/Vendormodel.js"
import bcrypt from "bcryptjs"

export const vendorSignup = async (req,res)=>{
    
    const {username,email,password,isTheatre} =req.body
const salt= bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(password, salt)
const newUser= new Vendor({
    username,email,password:hash,isTheatre
})
    const savedUser=await newUser.save()
    
    if(!savedUser||savedUser==undefined){
       console.log("Error in db");
    }else{
        res.status(200).json(savedUser)
    }
}



export const vendorRegistration = async (req,res)=>{
const _id=req.params.id
const {displayPicture,thumbnail,email,houseNo,addresslineOne,addresslineTwo,landmark,postOffice,district,state,remark} =req.body
try {
    const newUser= await Vendor.findOneAndUpdate({_id},{$set:{displayPicture,thumbnail,address:{houseNo,addresslineOne,addresslineTwo,landmark,postOffice,district,state,remark}}})
        
        
    
} catch (error) {
    console.log(error.message);
}
    // if(!newUser||newUser==undefined){
    //    console.log("Error in db");
    // }else{
        res.status(200).json({success:true})
    // }
}

export const vendorFacilities = async (req,res)=>{
    const _id=req.params.id
    const features=req.body.features
    const newUser= await Vendor.findOne({_id})
    const currentFacilities=newUser.features
    features.forEach((feature)=>{
           currentFacilities.push(feature)  
    })
    try {
        
        await Vendor.findOneAndUpdate({_id},{$set:{features:currentFacilities}})

    } catch (error) {
        console.log("cant update facilities");
    }
    const obj=await Vendor.findOne({_id})
   res.status(200).json(obj)
}

export const vendorEatables = async (req,res)=>{
    const _id=req.params.id
    const eatables=req.body.eatables
    const capacity=req.body.SeatingCapacity
    const newUser= await Vendor.findOne({_id})
   
    const currentEatables=newUser.eatables
    eatables.forEach((food)=>{
        currentEatables.push(food)  
    })
    try {
        
        await Vendor.findOneAndUpdate({_id},{$set:{eatables:currentEatables,seatingCapacity:capacity}})

    } catch (error) {
        console.log("cant update facilities");
    }
    const obj=await Vendor.findOne({_id})
   res.status(200).json(obj)
}

export const vendorTimings = async (req,res)=>{
    const _id=req.params.id
    const timings=req.body.timings
    const price=req.body.price
        
    await Vendor.findOneAndUpdate({_id},{$set:{timeSlots:timings,price}})

   
    const obj=await Vendor.findOne({_id})
   res.status(200).json(obj)
}


export const vendorApproval = async (req,res)=>{
    const _id=req.params.id
     const vendor= await Vendor.findOne({_id})
     
     if(vendor.isAccess==="Not Allowed"){

            await Vendor.findOneAndUpdate({_id},{$set:{isAccess:"Allowed"}})
        }else if(vendor.isAccess==="Allowed"){
            await Vendor.findOneAndUpdate({_id},{$set:{isAccess:"Blocked"}})
   
        }else if(vendor.isAccess==="Blocked"){
            await Vendor.findOneAndUpdate({_id},{$set:{isAccess:"Not Allowed"}})
   
        }
       

   
    const obj=await Vendor.findOne({_id})
   res.status(200).json(obj)
}


// allowEdit

export const vendorEdit = async (req,res)=>{
    const _id=req.params.id
     const vendor= await Vendor.findOne({_id})
     
     if(vendor.isAccess==="Not Allowed"){

            await Vendor.findOneAndUpdate({_id},{$set:{isAccess:"Allowed"}})
        }else if(vendor.isAccess==="Allowed"){
            await Vendor.findOneAndUpdate({_id},{$set:{isAccess:"Blocked"}})
   
        }else if(vendor.isAccess==="Blocked"){
            await Vendor.findOneAndUpdate({_id},{$set:{isAccess:"Not Allowed"}})
   
        }
       

   
    const obj=await Vendor.findOne({_id})
   res.status(200).json(obj)
}


export const allowEdit= async (req,res,next)=>{
    const _id=req.params.id
    try {
        const vendorDetails= await Vendor.findOne({_id})
        if(vendorDetails.isAccess==="Allowed"){
            res.status(200).json(vendorDetails)
        }else{
            res.status(403).json("cant edit now")
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
  
   
}



export const prodDet= async (req,res,next)=>{
    const _id=req.params.id
    try {
        const vendorDetails= await Vendor.findOne({_id})
        res.status(200).json(vendorDetails)
}catch(err){
    res.status(403).json({mssg:"no matching id"})
}

}
