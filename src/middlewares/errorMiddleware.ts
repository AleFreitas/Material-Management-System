import httpStatus from "http-status";
import { Request, Response } from "express";

export function handleApplicationErrors(err, req: Request, res: Response, next) {
    if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
        return res.status(httpStatus.CONFLICT).send({
            message: err.message,
        });
    }

    if (err.name === "InvalidCredentialsError") {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: err.message,
        });
    }

    if (err.name === "UnauthorizedError") {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: err.message,
        });
    }

    if (err.name === "NotFoundError" || err.name === "NotFoundAtQueryError" || err.name === "HttpsQueryNotGiven") {
        return res.status(httpStatus.NOT_FOUND).send({
            message: err.message,
        });
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
}