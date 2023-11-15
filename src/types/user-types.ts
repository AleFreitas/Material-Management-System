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
