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


export type PayloadRegistroMaterial = Omit<Material, 'id'>;