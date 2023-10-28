import Bookings from "../Model/Bookings.js";
import User from "../Model/Usermodel.js"
import Vendor from "../Model/Vendormodel.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
export const signup = async (req,res,next)=>{
    console.log(req.body);
const {username,email,password,locality,district,state} =req.body
const salt= bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(password, salt)
const newUser= new User({
    username,email,password:hash,
    address:{
        locality,district,state
    },
    })
    try {
        const savedUser=await newUser.save()
        
        
        res.status(200).json(savedUser)
    } catch (error) {

       next(errorHandler(500,"Something gone wrong"));
        
    }
    
}


export const login = async (req,res)=>{
    console.log(req.body);
const {email,password} =req.body
  try {
    const viewer= await User.findOne({email})
   if(viewer){
    const isPasswordCorrect= await bcrypt.compare(password,viewer.password);
    if(isPasswordCorrect){
        res.status(200).json({viewer,message:"login successful"})
       }   
}
   
  } catch (error) {
    res.status(401).json({message:"login denied"})

   
  }

}

export const search = async (req,res)=>{
    const{isTheatre,search,location,seats}=req.body
    
    try {
        if(!isTheatre&&!search&&!location&&!seats){
            const vendors=await Vendor.find()

            return res.status(200).json(vendors)
        }
        // if(isTheatre==undefined){
        //   const isTheatre=true
        // }
        // if(!search){
        //   const search="00"
        // }
        // if(!location==undefined){
        //     const location="00"
        // }
        // if(!seats==undefined){
        //     const seats=1
        // }
        // console.log(isTheatre);
        // console.log(location);
        // console.log(search);
        // console.log(seats);
        // const vendors=await Vendor.find({"$or":[{"username":{$regex:search?search:"",$options:"i"}},{"address.district":{$regex:search?search:"",$options:"i"}}],seatingCapacity:{$gte:seats?seats:1},isTheatre:isTheatre?isTheatre:true})
        const vendors=await Vendor.find({$and:[{$or:[{"username":{$regex:search?search:"",$options:"i"}},{"address.district":{$regex:search?search:"",$options:"i"}}]},{"seatingCapacity":{$gte:seats?seats:1}},{"isTheatre":isTheatre?isTheatre:true},,{"address.district":location?location:"00"}]})
        
       
       return res.status(200).json({msg:"got it",vendors})
    } catch (error) {
        
        res.status(500).json({msg:"enter location and search"})
    }   

}

export const booking = async (req,res)=>{
  const viewerId=req.params.uid
  const theatreId=req.params.tid
  const{username,theatreName,timeSlots:timings,pricePerHour,seats,eatables,total}=req.body
try {
    
    const newBooking=new Bookings({
        viewerName:username,theatreName,timings,pricePerHour,seats,eatables,totalPrice:total 
  })
  const savedBooking=await newBooking.save()
  res.status(200).json(savedBooking)
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"booking gone wrong"})
}

}