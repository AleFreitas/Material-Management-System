import { Request, Response } from "express";
import httpStatus from "http-status";
import userServices from "../services/user-services.js";
import {
  PayloadLoginUsuario,
  PayloadRegistroUsuario,
} from "../types/user-types.js";
import authUtils from "../utils/auth-utils.js";

async function createUser(req: Request, res: Response, next) {
  try {
    const user: PayloadRegistroUsuario = req.body;
    await userServices.registerUser(user);
    res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

async function loginUser(req: Request, res: Response, next) {
  try {
    const user: PayloadLoginUsuario = req.body;
    const token = await userServices.loginUser(user);
    res.status(httpStatus.OK).send({ token });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

async function getUserInfo(req: Request, res: Response, next) {
  try {
    const { id } = req.params;
    await authUtils.authenticateUser(req);
    const user = await userServices.getUserInfo(id);
    res.status(httpStatus.OK).send(user);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

async function getUserLoans(req: Request, res: Response, next) {
  try {
    const { id } = req.params;
    await authUtils.authenticateUser(req);
    const user = await userServices.getUserLoans(id);
    res.status(httpStatus.OK).send(user);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

async function getUserBooks(req: Request, res: Response, next) {
  try {
    const { id } = req.params;
    await authUtils.authenticateUser(req);
    const user = await userServices.getUserBooks(id);
    res.status(httpStatus.OK).send(user);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

async function getUserMaterials(req: Request, res: Response, next) {
  try {
    const { id } = req.params;
    await authUtils.authenticateUser(req);
    const user = await userServices.getUserMaterials(id);
    res.status(httpStatus.OK).send(user);
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

async function getUserIdByEmail(req: Request, res: Response, next) {
  try {
    const { email } = req.params;
    const id = await userServices.getUserIdByEmail(email);
    res.status(httpStatus.OK).send({ id: id });
  } catch (err) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    res.status(statusCode).send({ error: message });
    return next(err);
  }
}

export default {
  createUser,
  loginUser,
  getUserInfo,
  getUserLoans,
  getUserBooks,
  getUserMaterials,
  getUserIdByEmail,
};
