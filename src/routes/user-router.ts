import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/user-schemas.js";
import userControllers from "../controllers/user-controllers.js";

const authRouter = Router()

//auth
authRouter.post("/sign-up", validateSchema(userSignUpSchema), userControllers.createUser)
authRouter.post("/sign-in", validateSchema(userSignInSchema), userControllers.loginUser)

authRouter.get("/user/:id", userControllers.getUserInfo)
authRouter.get("/user/:id/loan", userControllers.getUserLoans)
authRouter.get("/user/:id/book", userControllers.getUserBooks)
authRouter.get("/user/:id/material", userControllers.getUserMaterials)
authRouter.get("/user/:email", userControllers.getUserIdByEmail)

export default authRouter;