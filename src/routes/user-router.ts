import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/user-schemas.js";
import userControllers from "../controllers/user-controllers.js";
import materialControllers from "../controllers/material-controllers.js";

const authRouter = Router()

//auth
authRouter.post("/sign-up", validateSchema(userSignUpSchema), userControllers.createUser)
authRouter.post("/sign-in", validateSchema(userSignInSchema), userControllers.loginUser)

authRouter.get("user/:id", userControllers.getUserInfo)
authRouter.get("user/:id/loan", materialControllers.getUserLoans)
authRouter.get("user/:id/book", materialControllers.getUserBooks)
authRouter.get("user/:id/material", materialControllers.getUserMaterials)

export default authRouter;