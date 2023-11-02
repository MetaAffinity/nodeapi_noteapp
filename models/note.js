import mongoose from "mongoose";

const noteschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
export const Note = mongoose.model("Note",noteschema)