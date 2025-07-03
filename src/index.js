
import connect from "./db/db.js";
import dotenv, { config } from "dotenv";
dotenv.config({
    path:'./env'
})




connect();
// import express from "express";
// const app= express();


// ( async ()=>{
//     try {
//       await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error" , (error)=>{
//           console.log("ERROR:",error);
//           throw error
          
//       })
//       app.listen(process.env.PORT, ()=>{
//         console.log(`App listening on port ${process.env.PORT}`);
        
//       })
//     } catch (error) {
//         console.error("ERROR:",error);
//         throw err
//     }
// })()