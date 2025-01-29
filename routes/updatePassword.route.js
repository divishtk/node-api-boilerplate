import e from "express";
import jwtMiddleware from "../middlewares/jwtauth.middleware.js";
import { updatePasswordController } from "../controllers/updateUser.controller.js";



const routes = e.Router();

routes.route("/update-password").post((jwtMiddleware),updatePasswordController);
export default routes;