import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import loanControllers from "../controllers/loan-controllers.js";
import { renewLoanSchema } from "../schemas/loan-schemas.js";

const loanRouter = Router()

loanRouter.post("/loan/:itemId", loanControllers.createLoan)
loanRouter.delete("/loan/:itemId", loanControllers.completeLoan)
loanRouter.put("/loan/:itemId", validateSchema(renewLoanSchema), loanControllers.renewLoan)
loanRouter.get("/loan", loanControllers.listLoans)
loanRouter.get("/loan/book", loanControllers.listBookLoans)
loanRouter.get("/loan/material", loanControllers.listMaterialLoans)

export default loanRouter;