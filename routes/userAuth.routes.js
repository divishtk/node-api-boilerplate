import e from "express";
import {loginController, resgisterUser} from "../controllers/usersauth.controller.js";
import userAuthMiddleware from "../middlewares/userAuth.middleware.js";
import errorHandlerMiddlware from "../middlewares/errorhandler.middlware.js";

const routes = e.Router();

routes.route("/register").post(userAuthMiddleware, resgisterUser);
routes.route("/login").post(loginController);
routes.use(errorHandlerMiddlware)


export default routes;
