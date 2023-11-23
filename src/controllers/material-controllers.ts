import { Request, Response } from "express";
import httpStatus from 'http-status';
import { Livro, PayloadRegisterAuthor, PayloadRegisterBookAuthor, PayloadRegisterCategory, PayloadRegistroMaterial } from "../types/material-types.js";
import materialServices from "../services/material-services.js";
import errors from "../errors/index.js";
import sessionRepository from "../repositories/session-repository.js";
import userRepository from "../repositories/user-repository.js";
import authUtils from "../utils/auth-utils.js";

async function createBook(req: Request, res: Response, next) {
    try {
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const book: Livro = req.body
        await materialServices.registerBook(book)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

async function updateBook(req: Request, res: Response, next) {
    try{
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()
        
        const { isbn } = req.params
        const newBookData = req.body
        if(!isbn) throw errors.notFoundError()
        if(!newBookData  || Object.keys(newBookData).length === 0) throw errors.noBodyError()
        await materialServices.updateBook(newBookData, isbn)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        return next(err)
    }
}

async function deleteBook(req: Request, res: Response, next) {
    try{
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const { isbn } = req.params
        if(!isbn) throw errors.notFoundError()
        await materialServices.deleteBook(isbn)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        return next(err)
    }
}

async function createMaterial(req: Request, res: Response, next) {
    try {
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const material: PayloadRegistroMaterial = req.body
        await materialServices.registerMaterial(material)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

async function updateMaterial(req: Request, res: Response, next) {
    try{
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()
        
        const { id } = req.params
        const newMaterialData = req.body
        if(!id) throw errors.notFoundError()
        if(!newMaterialData || Object.keys(newMaterialData).length === 0) throw errors.noBodyError()
        await materialServices.updateMaterial(newMaterialData, id)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        return next(err)
    }
}

async function deleteMaterial(req: Request, res: Response, next) {
    try{
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const { id } = req.params
        if(!id) throw errors.notFoundError()
        await materialServices.deleteMaterial(id)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        return next(err)
    }
}

async function createAuthor(req: Request, res: Response, next) {
    try {
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const author: PayloadRegisterAuthor = req.body
        await materialServices.registerAuthor(author)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

async function updateAuthor(req: Request, res: Response, next) {
    try{
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()
        
        const { id } = req.params
        const newAuthorData = req.body
        if(!id) throw errors.notFoundError()
        if(!newAuthorData || Object.keys(newAuthorData).length === 0) throw errors.noBodyError()
        await materialServices.updateAuthor(newAuthorData, id)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        return next(err)
    }
}

async function deleteAuthor(req: Request, res: Response, next) {
    try{
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const { id } = req.params
        if(!id) throw errors.notFoundError()
        await materialServices.deleteAuthor(id)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        return next(err)
    }
}

async function insertBookAuthor(req: Request, res: Response, next) {
    try {
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const body: PayloadRegisterBookAuthor = req.body
        await materialServices.registerBookAuthor(body)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

async function deleteBookAuthor(req: Request, res: Response, next) {
    try{
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const { id, isbn } = req.params
        await materialServices.deleteBookAuthor(id, isbn)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        return next(err)
    }
}

async function createBookCategory(req: Request, res: Response, next) {
    try {
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const {name} = req.params
        if(name === undefined) throw errors.invalidInputData('name url param', 'nothing', 'a name')
        await materialServices.registerBookCategory(name)
        
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

async function createMaterialCategory(req: Request, res: Response, next) {
    try {
        //auth
        const usuario = await authUtils.authenticateUser(req)
        if(!authUtils.isUserAdmin(usuario)) throw errors.insuficientAcessLevelError()

        const {name, material_id} = req.params
        if(name === undefined || material_id === undefined) throw errors.invalidInputData('url param', 'missing param', 'a param')
        await materialServices.registerMaterialCategory(name, material_id)
        
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

export default {
    createBook,
    updateBook,
    deleteBook,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    insertBookAuthor,
    deleteBookAuthor,
    createBookCategory,
    createMaterialCategory,
}