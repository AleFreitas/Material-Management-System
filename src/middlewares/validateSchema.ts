import { Request, Response } from "express";

export function validateSchema(schema) {
    return (req: Request, res: Response, next) => {
        const validate = schema.validate(req.body, { abortEarly: false })
        if (validate.error) {
            const erros = validate.error.details.map((err) => {
                return err.message
            })
            return res.status(422).send(erros)
        }
        next()

    }
}