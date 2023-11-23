export type Livro = {
    isbn: string,
    descricao: string,
    data_aquisicao: string,
    conservacao: string,
    localizacao: string,
    quantidade: number,
    titulo: string,
    url_capa: string,
};

export type Material = {
    id: number,
    desc: string,
    data_Aquisicao: string,
    conservacao: string,
    localizacao: string,
    quantidade: number,
    serial: string,
    url_imagem: string,
    id_categoria_material: number,
}

export type Author = {
    id: number,
    nome: string,
    sobrenome: string,
    email: string,
}

export type BookAuthor = {
    id: number,
    id_autor: number,
    isbn: string,
}

export type Category = {
    id: number,
    nome: string,
}

export type PayloadRegisterCategory = Omit<Category, 'id'>;
export type PayloadRegisterBookAuthor = Omit<BookAuthor, 'id'>;
export type PayloadRegisterAuthor = Omit<Author, 'id'>;
export type PayloadRegistroMaterial = Omit<Material, 'id'>;