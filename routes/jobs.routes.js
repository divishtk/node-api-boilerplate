import e from "express";
import jwtMiddleware from "../middlewares/jwtauth.middleware.js";
import { createJobsController, deleteJobController, getAllJobsController, updateJobController } from "../controllers/jobs.controller.js";

const routes = e.Router();

routes.route("/create-jobs").post((jwtMiddleware),createJobsController);
routes.route("/get-jobs").post((jwtMiddleware),getAllJobsController);

routes.route("/update-job/:id").patch((jwtMiddleware),updateJobController);
routes.route("/update-job/:id").patch((jwtMiddleware),updateJobController);
routes.route("/delete-job/:id").delete((jwtMiddleware),deleteJobController);



export default routes;