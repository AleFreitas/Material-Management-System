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

async function getUserInfo(req: Request, res: Response, next) {
    try {
        const { id } = req.params
        const user = await userServices.getUserInfo(id)
        res.status(httpStatus.OK).send(user)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

async function getUserLoans(req: Request, res: Response, next) {
    try {
        const { id } = req.params
        const user = await userServices.getUserLoans(id)
        res.status(httpStatus.OK).send(user)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

async function getUserBooks(req: Request, res: Response, next) {
    try {
        const { id } = req.params
        const user = await userServices.getUserBooks(id)
        res.status(httpStatus.OK).send(user)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

async function getUserMaterials(req: Request, res: Response, next) {
    try {
        const { id } = req.params
        const user = await userServices.getUserMaterials(id)
        res.status(httpStatus.OK).send(user)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

export default {
    createUser,
    loginUser,
    getUserInfo,
    getUserLoans,
    getUserBooks,
    getUserMaterials
}