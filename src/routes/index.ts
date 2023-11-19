import { Router } from "express";
import authRouter from "./user-router.js";
import materialRouter from "./material-router.js";

const routes = Router()
routes.use(authRouter, materialRouter)

export default routes