import mongoose from "mongoose"

const vendorSchema= mongoose.Schema({
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
    featured: {
        type: Boolean,
        default: false
    },
    subscription: {
        type: Date,
        default: new Date()
    },
    features: [{
        featureName:{type:String,dafault:null},
        featureDescription:{type:String,dafault:null},
        featureFile:{type:String,dafault:null},
    }],
    isAccess: {
        type : String,
        default: "Not allowed"
    },
    displayPicture : {
        type : String,
        dafault:""
    },
    address: {type:Object,default:{
    houseNo: null,
    addresslineOne:null,
    addresslineTwo:null,
    postOffice:null,
    district:null,
    state:null,
    remark:null}
        
    
    },
    timeSlots: [{type:Number,dafault:null}],
    isTheatre: {
        type:Boolean,
        required:true,
        default:true

    },
    seatingCapacity:{
        type:Number,
        default:1
    },
    thumbnail : {
        type : String,
        dafault:""
    },
    viewers:[{type:String,dafault:null,unique:true}],
    eatables : [{
        item:{type:String,dafault:null},
        quantity:{type:Number,dafault:null},
        price:{type:Number,dafault:null}
    }],
    price:{type:Number,default:0}

})

export default mongoose.model("Vendordb",vendorSchema)