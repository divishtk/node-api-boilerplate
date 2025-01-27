import e from "express";
import { testPostContoller } from "../controllers/test.controller.js";

const routes = e.Router();

//routes.post("/test-post",testPostContoller);
routes.route("/test-post").post(testPostContoller);

export default routes;