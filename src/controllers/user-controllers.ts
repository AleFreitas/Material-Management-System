import { Request, Response } from "express";
import httpStatus from 'http-status';
import userServices from "../services/user-services.js";
import { PayloadLoginUsuario, PayloadRegistroUsuario } from "../types/user-types.js";

async function createUser(req: Request, res: Response, next) {
    try {
        const user: PayloadRegistroUsuario = req.body
        await userServices.registerUser(user)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

async function loginUser(req: Request, res: Response, next) {
    try {
        const user: PayloadLoginUsuario = req.body
        const token = await userServices.loginUser(user)
        res.status(httpStatus.OK).send({token})
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

export default {
    createUser,
    loginUser
}