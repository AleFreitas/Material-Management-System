export type Usuario = {
    id: number;
    nome: string;
    sobrenome: string;
    funcao: string;
    email: string;
    senha: string;
    url_imagem: string;
};

export type PayloadRegistroUsuario = Omit<Usuario, 'id'>;
export type PayloadLoginUsuario = Omit<Usuario, 'id' | 'nome' | 'sobrenome' | 'funcao' | 'url_imagem'>;
