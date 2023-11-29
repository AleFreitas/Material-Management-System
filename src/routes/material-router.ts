import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerAuthorSchema, registerBookAuthorSchema, registerBookSchema, registerCategorySchema, registerMaterialSchema } from "../schemas/material-schemas.js";
import materialControllers from "../controllers/material-controllers.js";

const materialRouter = Router()

materialRouter.get("/book", materialControllers.getAllBooks);
materialRouter.get("/book/:isbn", materialControllers.getBookByIsbn);
materialRouter.get("/book/author/:authorId", materialControllers.getBooksByAuthor) 
materialRouter.get("/book/category/:categoryId", materialControllers.getBooksByCategory)
materialRouter.post("/book", validateSchema(registerBookSchema), materialControllers.createBook)
materialRouter.put("/book/:isbn", materialControllers.updateBook)
materialRouter.delete("/book/:isbn", materialControllers.deleteBook)


materialRouter.get("/material", materialControllers.getAllMaterials);
materialRouter.get("/material/:id", materialControllers.getMaterialById);
materialRouter.get("/material/category/:categoryId", materialControllers.getMaterialsByCathegory)
materialRouter.post("/material", validateSchema(registerMaterialSchema), materialControllers.createMaterial)
materialRouter.put("/material/:id", materialControllers.updateMaterial)
materialRouter.delete("/material/:id", materialControllers.deleteMaterial)

materialRouter.post("/author", validateSchema(registerAuthorSchema), materialControllers.createAuthor)
materialRouter.put("/author/:id", materialControllers.updateAuthor)
materialRouter.delete("/author/:id", materialControllers.deleteAuthor)

materialRouter.post("/book-author", validateSchema(registerBookAuthorSchema), materialControllers.insertBookAuthor)
materialRouter.delete("/book-author/:id/:isbn", materialControllers.deleteBookAuthor)

materialRouter.post("/category", validateSchema(registerCategorySchema), materialControllers.createCategory)

materialRouter.get("user/:id", materialControllers.getUserInfo)
materialRouter.get("user/:id/loans", materialControllers.getUserLoans)
materialRouter.get("user/:id/books", materialControllers.getUserBooks)
materialRouter.get("user/:id/materials", materialControllers.getUserBooks)

export default materialRouter;