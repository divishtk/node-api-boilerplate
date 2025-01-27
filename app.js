import express from "express";
import "express-async-errors"
import  testRouter  from "./routes/tests.routes.js";
import authRouter  from "./routes/userAuth.routes.js";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser"; // For parsing JSON bodies


const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("./assets"));
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(
    express.json()
  );
  app.use(bodyParser.json());


  //app.use(userAuthMiddleware)
  

app.use('/api/v1/tests',testRouter)
app.use('/api/v1/auth',authRouter)



export {app}