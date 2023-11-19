import Joi from 'joi';

const registerBookSchema = Joi.object({
    isbn: Joi.string().required(),
    descricao: Joi.string().required(),
    data_aquisicao: Joi.string().required(),
    conservacao: Joi.string().required(),
    localizacao: Joi.string().required(),
    quantidade: Joi.number().required(),
    titulo: Joi.string().required(),
    url_capa: Joi.string().required(),
});

export{ registerBookSchema }