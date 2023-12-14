import { Request, Response } from "express";
import httpStatus from "http-status";
import errors from "../errors/index.js";
import authUtils from "../utils/auth-utils.js";
import loanServices from "../services/loan-services.js";

async function createLoan(req: Request, res: Response, next) {
  try {
    //auth
    const usuario = await authUtils.authenticateUser(req);
    const { itemId } = req.params;
    await loanServices.registerLoan(itemId, usuario);
    res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

async function completeLoan(req: Request, res: Response, next) {
  try {
    //auth
    const usuario = await authUtils.authenticateUser(req);

    const { itemId } = req.params;
    await loanServices.completeLoan(itemId, usuario);
    res.sendStatus(httpStatus.OK);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

async function renewLoan(req: Request, res: Response, next) {
  try {
    //auth
    const usuario = await authUtils.authenticateUser(req);

    const { itemId } = req.params;
    await loanServices.renewLoan(itemId, usuario);
    res.sendStatus(httpStatus.OK);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

async function listLoans(req: Request, res: Response, next) {
  try {
    // List all ITEMS that are currently loaned
    const usuario = await authUtils.authenticateUser(req);
    const loans = await loanServices.listLoans(usuario.id);
    res.status(httpStatus.OK).json(loans);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

async function listBookLoans(req: Request, res: Response, next) {
  try {
    await authUtils.authenticateUser(req);
    const loans = await loanServices.listBookLoans();
    res.status(httpStatus.OK).json(loans);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

async function listMaterialLoans(req: Request, res: Response, next) {
  try {
    await authUtils.authenticateUser(req);
    const loans = await loanServices.listMaterialLoans();
    res.status(httpStatus.OK).json(loans);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

export default {
  createLoan,
  completeLoan,
  renewLoan,
  listLoans,
  listBookLoans,
  listMaterialLoans,
};
