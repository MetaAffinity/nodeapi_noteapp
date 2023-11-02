import mongoose from "mongoose";

export const dbconnect = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "mytodoapp"
    }).then((c)=>console.log(`Database Connected with ${c.connection.host}`))
    .catch((e)=>console.log(e));
}