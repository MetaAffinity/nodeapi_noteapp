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
        ref:"User",
        required:true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
      }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
export const Note = mongoose.model("Note",noteschema)