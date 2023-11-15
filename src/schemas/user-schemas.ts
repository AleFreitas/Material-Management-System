import Joi from 'joi';

const userSignUpSchema = Joi.object({
    nome: Joi.string().required(),
    sobrenome: Joi.string().required(),
    funcao: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
    url_imagem: Joi.string().required(),
});

const userSignInSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required()
})

export { userSignUpSchema, userSignInSchema }