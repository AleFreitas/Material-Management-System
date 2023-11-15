export type Sessao = {
    id: number;
    id_usuario: number;
    token: string;
};

export type RegistroSessao = Omit<Sessao, 'id'>;