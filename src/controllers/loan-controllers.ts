import { Request, Response } from "express";
import httpStatus from 'http-status';
import errors from "../errors/index.js";
import authUtils from "../utils/auth-utils.js";
import loanServices from "../services/loan-services.js";

async function createLoan(req: Request, res: Response, next) {
    try {
        //auth
        const usuario = await authUtils.authenticateUser(req)
        const { itemId } = req.params
        await loanServices.registerLoan(itemId, usuario)
        res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

export default {
    createLoan,
}