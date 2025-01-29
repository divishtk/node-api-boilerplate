import e from "express";
import { testPostContoller } from "../controllers/test.controller.js";
import jwtMiddleware from "../middlewares/jwtauth.middleware.js";
import errorHandlerMiddlware from "../middlewares/errorhandler.middlware.js";

const routes = e.Router();

//routes.post("/test-post",testPostContoller);
routes.route("/test-post").post((jwtMiddleware),testPostContoller);
routes.use(errorHandlerMiddlware)

export default routes;