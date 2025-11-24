import mongoose from "mongoose";

const noteSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    content:{
        type:String,
        required:true,
        trim: true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    }

},
{timestamps:true})

const Note=mongoose.model("Note",noteSchema)

export default Note