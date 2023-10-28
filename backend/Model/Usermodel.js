import mongoose from "mongoose"

const userSchema= mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        // required: true
    },
    booking: [
        {type:String
        }
        
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
        houseNo:{ type: String },
        addresslineOne:{type:String},
        addresslineTwo:{type:String},
        postOffice:{type: String},
        district:{type:String},
        state:{type:String}
    
    }
})

export default mongoose.model("Viewer",userSchema)