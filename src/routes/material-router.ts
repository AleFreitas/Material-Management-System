import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerBookSchema, registerMaterialSchema } from "../schemas/material-schemas.js";
import materialControllers from "../controllers/material-controllers.js";

const materialRouter = Router()

materialRouter.post("/book", validateSchema(registerBookSchema), materialControllers.createBook)
materialRouter.post("/material", validateSchema(registerMaterialSchema), materialControllers.createMaterial)

export default materialRouter;