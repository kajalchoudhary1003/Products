import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['admin','team-member'],
        required: true,
    },
    reviewProduct:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReviewProduct'
    }]
})

export default mongoose.models.User || mongoose.model("User",userSchema)