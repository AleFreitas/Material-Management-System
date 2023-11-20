import pool from "../config/database.js"
import { QueryResult } from "pg";
import { PayloadRegistroUsuario, Usuario } from "../types/user-types.js";

async function findUserByEmail(email: string): Promise<QueryResult<Usuario>> {
    return pool.query(`
        SELECT * FROM usuario
        WHERE email=$1;         
    `, [email]);
}

async function findUserById(id): Promise<QueryResult<Usuario>> {
    return pool.query(`
        SELECT * FROM usuario
        WHERE id=$1;         
    `, [id]);
}

async function insertUser(user: PayloadRegistroUsuario): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO usuario (nome, sobrenome, funcao, email, senha, url_imagem)
        VALUES ($1, $2, $3, $4, $5, $6);
    `, [user.nome, user.sobrenome, user.funcao, user.email, user.senha, user.url_imagem])
}

export default {
    findUserByEmail,
    findUserById,
    insertUser
}