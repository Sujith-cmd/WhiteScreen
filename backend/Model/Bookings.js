import mongoose from "mongoose"

const bookingSchema= mongoose.Schema({
    theatreName: {
        type:String,
        required: true
    },
    viewerName: {
        type:String,
        required: true
    },
    timeSlots:[{type:Number}],
    
    pricePerHour: {
        type: Number,
        default: 0
    },
    seats:{
        type:Number,
        required:true,
        default:1
    },
    eatables:[{item: {type:String,dafault:null},
              quantity: {type:Number,dafault:0},
              price: {type:Number,dafault:0},
              total:{type:Number,dafault:0}
    }],
    totalPrice:{
        type:Number
    }
    
},{timestamps:true})

export default mongoose.model("Booking",bookingSchema)