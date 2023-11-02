import mongoose from "mongoose";

export const dbconnect = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017",{
        dbName: "mytodoapp"
    }).then(()=>console.log("Database Connected")).catch((e)=>console.log(e));
}