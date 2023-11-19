import { Request, Response } from "express";
import httpStatus from 'http-status';
import { Livro, PayloadRegistroMaterial } from "../types/material-types.js";
import materialServices from "../services/material-services.js";
import errors from "../errors/index.js";

async function createBook(req: Request, res: Response, next) {
    try {
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
        const { isbn } = req.params
        const newBookData = req.body
        if(!isbn) throw errors.notFoundError()
        if(!newBookData) throw errors.noBodyError()
        await materialServices.updateBook(newBookData, isbn)
        res.sendStatus(httpStatus.OK)
    } catch(err) {
        console.log(err)
        return next(err)
    }
}

async function deleteBook(req: Request, res: Response, next) {
    try{
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
        const material: PayloadRegistroMaterial = req.body
        await materialServices.registerMaterial(material)
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
}