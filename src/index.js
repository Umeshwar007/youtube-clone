import { app } from "./app.js";
import connect from "./db/db.js";
import dotenv, { config } from "dotenv";
dotenv.config({
    path:'./env'
})


connect()
.then(()=>{
    app.listen(process.env.PORT|| 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
     app.on("error" , (error)=>{
          console.log("ERROR:",error);
          throw error
          
      })
})
.catch((error)=>{
    console.log("Mongo DB Connection Failed",error);
}
)
























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