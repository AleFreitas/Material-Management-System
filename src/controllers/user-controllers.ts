import { Request, Response } from "express";
import httpStatus from 'http-status';
import userServices from "../services/user-services.js";
import { PayloadRegistroUsuario } from "../types/user-types.js";

async function createUser(req: Request, res: Response, next) {
    try {
        const user: PayloadRegistroUsuario = req.body
        await userServices.registerUser(user)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        return next(err);
    }
}

export default {
    createUser
}