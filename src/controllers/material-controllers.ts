import { Request, Response } from "express";
import httpStatus from 'http-status';
import userServices from "../services/user-services.js";
import { Livro } from "../types/material-types.js";
import materialServices from "../services/material-services.js";

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

export default {
    createBook,
}