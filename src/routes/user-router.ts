import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSignUpSchema } from "../schemas/user-schemas.js";
import userControllers from "../controllers/user-controllers.js";

const authRouter = Router()

//auth
authRouter.post("/sign-up", validateSchema(userSignUpSchema), userControllers.createUser)

export default authRouter;