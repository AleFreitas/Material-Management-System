import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerAuthorSchema, registerBookSchema, registerMaterialSchema } from "../schemas/material-schemas.js";
import materialControllers from "../controllers/material-controllers.js";

const materialRouter = Router()

materialRouter.post("/book", validateSchema(registerBookSchema), materialControllers.createBook)
materialRouter.put("/book/:isbn", materialControllers.updateBook)
materialRouter.delete("/book/:isbn", materialControllers.deleteBook)

materialRouter.post("/material", validateSchema(registerMaterialSchema), materialControllers.createMaterial)
materialRouter.put("/material/:id", materialControllers.updateMaterial)
materialRouter.delete("/material/:id", materialControllers.deleteMaterial)

materialRouter.post("/author", validateSchema(registerAuthorSchema), materialControllers.createAuthor)
materialRouter.put("/author/:id", materialControllers.updateAuthor)
materialRouter.delete("/author/:id", materialControllers.deleteAuthor)

export default materialRouter;