import e from "express";
import resgisterUser from "../controllers/usersauth.controller.js";
import userAuthMiddleware from "../middlewares/userAuth.middleware.js";
import errorHandlerMiddlware from "../middlewares/errorhandler.middlware.js";

const routes = e.Router();

routes.route("/register").post(userAuthMiddleware, resgisterUser);
routes.use(errorHandlerMiddlware)

export default routes;
