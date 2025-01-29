import express from "express";
import "express-async-errors"
import  testRouter  from "./routes/tests.routes.js";
import authRouter  from "./routes/userAuth.routes.js";
import userRouter from "./routes/updateUser.routes.js";
import updayePasswordRouter from "./routes/updatePassword.route.js";
import createJobsRouter from "./routes/jobs.routes.js";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser"; // For parsing JSON bodies
import errorHandlerMiddlware from "./middlewares/errorhandler.middlware.js";
import { createJobsController } from "./controllers/jobs.controller.js";


const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("./assets"));
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(
    express.json()
  );
  app.use(bodyParser.json());

app.use('/api/v1/tests',testRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/update',updayePasswordRouter)
app.use('/api/v1/job',createJobsRouter)


app.use(errorHandlerMiddlware);


export {app}