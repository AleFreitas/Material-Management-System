import { Router } from "express";
import authRouter from "./user-router.js";

const routes = Router()
routes.use(authRouter)

export default routes