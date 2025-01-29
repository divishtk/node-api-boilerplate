import e from "express";
import jwtMiddleware from "../middlewares/jwtauth.middleware.js";
import updateUserController from "../controllers/updateUser.controller.js";


const routes = e.Router();

routes.route("/update-user").post((jwtMiddleware),updateUserController);
export default routes;