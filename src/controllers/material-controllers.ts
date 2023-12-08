import { Request, Response } from "express";
import httpStatus from 'http-status';
import errors from "../errors/index.js";
import materialServices from "../services/material-services.js";
import { Livro, PayloadBookCategory, PayloadRegisterAuthor, PayloadRegisterBookAuthor, PayloadRegisterCategory, PayloadRegistroMaterial } from "../types/material-types.js";
import authUtils from "../utils/auth-utils.js";

async function createBook(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)

        const book: Livro = req.body
        await materialServices.registerBook(book)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function updateBook(req: Request, res: Response, next) {
    try{
        //auth
        await authUtils.authenticateUser(req)
        
        const { isbn } = req.params
        const newBookData = req.body
        if(!isbn) throw errors.notFoundError()
        if(!newBookData  || Object.keys(newBookData).length === 0) throw errors.noBodyError()
        await materialServices.updateBook(newBookData, isbn)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function deleteBook(req: Request, res: Response, next) {
    try{
        //auth
        await authUtils.authenticateUser(req)

        const { isbn } = req.params
        if(!isbn) throw errors.notFoundError()
        await materialServices.deleteBook(isbn)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function createMaterial(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)

        const material: PayloadRegistroMaterial = req.body
        await materialServices.registerMaterial(material)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function updateMaterial(req: Request, res: Response, next) {
    try{
        //auth
        await authUtils.authenticateUser(req)
        
        const { id } = req.params
        const newMaterialData = req.body
        if(!id) throw errors.notFoundError()
        if(!newMaterialData || Object.keys(newMaterialData).length === 0) throw errors.noBodyError()
        await materialServices.updateMaterial(newMaterialData, id)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function deleteMaterial(req: Request, res: Response, next) {
    try{
        //auth
        await authUtils.authenticateUser(req)

        const { id } = req.params
        if(!id) throw errors.notFoundError()
        await materialServices.deleteMaterial(id)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function createAuthor(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)

        const author: PayloadRegisterAuthor = req.body
        await materialServices.registerAuthor(author)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function updateAuthor(req: Request, res: Response, next) {
    try{
        //auth
        await authUtils.authenticateUser(req)
        
        const { id } = req.params
        const newAuthorData = req.body
        if(!id) throw errors.notFoundError()
        if(!newAuthorData || Object.keys(newAuthorData).length === 0) throw errors.noBodyError()
        await materialServices.updateAuthor(newAuthorData, id)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function deleteAuthor(req: Request, res: Response, next) {
    try{
        //auth
        await authUtils.authenticateUser(req)

        const { id } = req.params
        if(!id) throw errors.notFoundError()
        await materialServices.deleteAuthor(id)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function insertBookAuthor(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)

        const body: PayloadRegisterBookAuthor = req.body
        await materialServices.registerBookAuthor(body)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function deleteBookAuthor(req: Request, res: Response, next) {
    try{
        //auth
        await authUtils.authenticateUser(req)

        const { id, isbn } = req.params
        await materialServices.deleteBookAuthor(id, isbn)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function createCategory(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)

        const body: PayloadRegisterCategory = req.body
        if(body.tipo_de_categoria === "livro"){
            await materialServices.registerBookCategory(body.nome)
        } else if (body.tipo_de_categoria === "material"){
            await materialServices.registerMaterialCategory(body.nome)
        } else {
            throw errors.invalidInputData('tipo_de_categoria',body.tipo_de_categoria, 'material or livro')
        }
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function addCategoryToBook(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)

        const body: PayloadBookCategory = req.body
        await materialServices.linkBookToCategory(body.isbn, body.id_categoria)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getAllBooks(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const books = await materialServices.getAllBooks()
        res.status(httpStatus.OK).send(books)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getBookByIsbn(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const { isbn } = req.params
        const book = await materialServices.getBookByIsbn(isbn)
        res.status(httpStatus.OK).send(book)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getBooksByAuthor(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const { authorId } = req.params
        const books = await materialServices.getBooksByAuthor(authorId)
        res.status(httpStatus.OK).send(books)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getAllMaterials(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const materials = await materialServices.getAllMaterials()
        res.status(httpStatus.OK).send(materials)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getMaterialById(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const { id } = req.params
        const book = await materialServices.getMaterialById(id)
        res.status(httpStatus.OK).send(book)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}


async function getBooksByCategory(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const { categoryId } = req.params
        const books = await materialServices.getBooksByCategory(categoryId)
        res.status(httpStatus.OK).send(books)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getMaterialsByCategory(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const { categoryId } = req.params
        const materials = await materialServices.getMaterialsByCategory(categoryId)
        res.status(httpStatus.OK).send(materials)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getAllAuthors(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const authors = await materialServices.getAllAuthors()
        res.status(httpStatus.OK).send(authors)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getAllBookCategories(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const categories = await materialServices.getAllBookCategories()
        res.status(httpStatus.OK).send(categories)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getAllMaterialCategories(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const categories = await materialServices.getAllMaterialCategories()
        res.status(httpStatus.OK).send(categories)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";

        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

async function getAuthorsByBook(req: Request, res: Response, next) {
    try {
        //auth
        await authUtils.authenticateUser(req)
        const { isbn } = req.params
        const authors = await materialServices.getAuthorsByBook(isbn)
        res.status(httpStatus.OK).send(authors)
    } catch (err) {
        console.log(err)
        const statusCode = err.statusCode || 500;
        const message = err.message || "An unexpected error occurred";
        
        res.status(statusCode).send({ error: message });
        return next(err);
    }
}

export default {
    createAuthor,
    createBook,
    createCategory,
    createMaterial,
    addCategoryToBook,
    deleteAuthor,
    deleteBook,
    deleteBookAuthor,
    deleteMaterial,
    getAllBooks,
    getAllMaterials,
    getBookByIsbn,
    getMaterialById,
    insertBookAuthor,
    updateBook,
    updateMaterial,
    updateAuthor,
    getBooksByAuthor,
    getBooksByCategory,
    getMaterialsByCategory,
    getAllAuthors,
    getAllBookCategories,
    getAllMaterialCategories,
    getAuthorsByBook
}