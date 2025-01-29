import e from "express";
import jwtMiddleware from "../middlewares/jwtauth.middleware.js";
import { createJobsController, getAllJobsController } from "../controllers/jobs.controller.js";

const routes = e.Router();

routes.route("/create-jobs").post((jwtMiddleware),createJobsController);
routes.route("/get-jobs").post((jwtMiddleware),getAllJobsController);



export default routes;