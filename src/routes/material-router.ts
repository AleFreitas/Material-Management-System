import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerBookSchema } from "../schemas/material-schemas.js";
import materialControllers from "../controllers/material-controllers.js";

const materialRouter = Router()

materialRouter.post("/book", validateSchema(registerBookSchema), materialControllers.createBook)

export default materialRouter;