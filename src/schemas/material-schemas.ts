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

const registerMaterialSchema = Joi.object({
    desc: Joi.string().required(),
    data_Aquisicao: Joi.string().required(),
    conservacao: Joi.string().required(),
    localizacao: Joi.string().required(),
    quantidade: Joi.number().required(),
    serial: Joi.string().required(),
    url_imagem: Joi.string().required(),
    id_categoria_material: Joi.number().required(),
});

export{ registerBookSchema, registerMaterialSchema }