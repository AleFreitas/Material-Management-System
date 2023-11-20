import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import loanControllers from "../controllers/loan-controllers.js";

const loanRouter = Router()

loanRouter.post("/loan/:itemId", loanControllers.createLoan)

export default loanRouter;