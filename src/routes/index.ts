import { Router } from "express";
import authRouter from "./user-router.js";
import materialRouter from "./material-router.js";
import loanRouter from "./loan-router.js";

const routes = Router()
routes.use(authRouter, materialRouter, loanRouter)

export default routes