import e from "express";
import {loginController, resgisterUser} from "../controllers/usersauth.controller.js";
import userAuthMiddleware from "../middlewares/userAuth.middleware.js";
import errorHandlerMiddlware from "../middlewares/errorhandler.middlware.js";
import { rateLimit } from 'express-rate-limit'


//ip limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', 
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

const routes = e.Router();

routes.route("/register").post(userAuthMiddleware, limiter ,resgisterUser);
routes.route("/login").post(loginController,limiter);
routes.use(errorHandlerMiddlware)


export default routes;
