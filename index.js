import dotenv from "dotenv";
import { app } from "./app.js";
import colors from "colors";
import mongoConnect from "./config/db.config.js";

/*dotenv.config({
    path: "./.env",
})*/

dotenv.config();

const PORT = 3000;


   mongoConnect().then(()=>{
        console.log("MongoDB Connected!!".bgGreen.black);
        app.listen(process.env.PORT || PORT,(req,res)=>{
            console.log(`App is running on phase ${process.env.DEV_MODE} ON PORT ${process.env.PORT || PORT}`.bgYellow.blue);
        })
    }).catch((err)=>{
        console.log("Connection issue", err);
        process.exit(1);
    });

   