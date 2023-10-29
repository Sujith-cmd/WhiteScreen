import mongoose from "mongoose"

const userSchema= mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    booking: [
        {type:String,dafault:null}  
    ],
    account_Bal: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    isAccess: {
        type : Boolean,
        default: true
    },
    displayPicture : {
        type : String
    },
    address: {
        locality:{type: String},
        district:{type:String},
        state:{type:String}
    
    }
},{timestamps:true})

export default mongoose.model("Viewer",userSchema)