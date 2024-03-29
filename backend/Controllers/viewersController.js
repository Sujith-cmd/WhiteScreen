import Bookings from "../Model/Bookings.js";
import User from "../Model/Usermodel.js"
import Vendor from "../Model/Vendormodel.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next)=>{
    const {username,email,password} =req.body
    try {
    const hash= bcrypt.hashSync(password,10)
   

        const newUser= new User({
            username,email,password:hash
    })

console.log("NEW USER");
console.log(newUser);

    const savedUser=await newUser.save()
    
    console.log("saved USER");
    console.log(savedUser);
        
        res.status(200).json(savedUser)
    } catch (error) {
       console.log("error");
       console.log(error);
       next(errorHandler(500,"Something gone wrong"));
        
    }
    
}

 
export const login = async (req,res,next)=>{
    console.log(req.body);
const {email,password} =req.body
  try {
    const viewer= await User.findOne({email})
    // console.log(viewer);
   if(viewer){

    // if(req.body.displayPicture){
    //   return  res.status(200).json({viewer,message:"login successful"})
    // }




    const isPasswordCorrect= await bcrypt.compare(password,viewer.password);
   
    if(isPasswordCorrect){
        const token=jwt.sign({id:viewer._id},process.env.JWT_SECRET)
        const {password,...rest}=viewer._doc
        const expiryDate = new Date(Date.now()+3600000)
        res.cookie('access_token',token,{httpOnly:true, expires:expiryDate}).status(200).json({rest,message:"login successful"})
       }else{
        next(errorHandler(401,"Invalid Credentials"))
    } 
}else{
    next(errorHandler(401,"Invalid Credentials"))
}
   
  } catch (error) {
    // res.status(401).json({message:"login denied"})
    next(error)

   
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
//   const viewerId=req.params.uid
//   const theatreId=req.params.tid
//   const{username,theatreName,timeSlots:timings,pricePerHour,seats,eatables,total}=req.body
// try {
    
//     const newBooking=new Bookings({
//         viewerName:username,theatreName,timings,pricePerHour,seats,eatables,totalPrice:total 
//   })
//   const savedBooking=await newBooking.save()
//   res.status(200).json(savedBooking)
// } catch (error) {
//     console.log(error);
//     res.status(500).json({msg:"booking gone wrong"})
// }
const result= await User.updateMany({},{$set:{displayPicture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLP6xJXBY_W2tT5waakogfnpHk4uhpVTy7A&usqp=CAU"}})
res.status(200).json(result)
}


export const google = async (req,res)=>{
try {
    const viewer= await User.findOne({email:req.body.email})
    if(viewer){
        const token = jwt.sign({id:viewer._id},process.env.JWT_SECRET)
        const {password,...rest}=viewer._doc
        const expiryDate = new Date(Date.now()+3600000)
       return res.cookie('access_token',token,{httpOnly:true, expires:expiryDate}).status(200).json({rest,message:"login successful"})
       
    }else{
         const generatedPassword=Math.random().toString(36).slice(-8)
         const newUser= new User({
            username:req.body.username.split(" ").join("").toLowerCase(),
            email:req.body.email,password:generatedPassword,displayPicture:req.body.photoURL
    })
        await newUser.save()
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
        // const {password,...rest}=newUser
        const expiryDate = new Date(Date.now()+3600000)
      return  res.cookie('access_token',token,{httpOnly:true, expires:expiryDate}).status(200).json({newUser,message:"signup and login successful"})
       
        }
} catch (error) {
    console.log(error);
  return res.status(500).json({message:"login failed"})

}
}


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };