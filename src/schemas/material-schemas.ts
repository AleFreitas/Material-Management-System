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

const registerAuthorSchema = Joi.object({
    nome: Joi.string().required(),
    sobrenome: Joi.string().required(),
    email: Joi.string().email().required(),
});

const registerBookAuthorSchema = Joi.object({
    id_autor: Joi.number().required(),
    isbn: Joi.string().required(),
});

const linkBookToCategorySchema = Joi.object({
    id_categoria: Joi.number().required(),
    isbn:  Joi.string().required(),
})

const registerCategorySchema = Joi.object({
    nome: Joi.string().required(),
    tipo_de_categoria: Joi.string().required(),
})

export{ registerBookSchema, registerMaterialSchema, registerAuthorSchema, registerBookAuthorSchema, linkBookToCategorySchema, registerCategorySchema }