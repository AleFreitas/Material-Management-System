import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import loanControllers from "../controllers/loan-controllers.js";

const loanRouter = Router()

loanRouter.post("/loan/:itemId", loanControllers.createLoan)
loanRouter.delete("/loan/:itemId", loanControllers.completeLoan)

export default loanRouter;