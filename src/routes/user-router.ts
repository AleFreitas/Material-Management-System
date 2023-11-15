import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/user-schemas.js";
import userControllers from "../controllers/user-controllers.js";

const authRouter = Router()

//auth
authRouter.post("/sign-up", validateSchema(userSignUpSchema), userControllers.createUser)
authRouter.post("/sign-in", validateSchema(userSignInSchema), userControllers.loginUser)

export default authRouter;