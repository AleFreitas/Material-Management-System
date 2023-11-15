import pool from "../config/database.js"
import { QueryResult } from "pg";
import { PayloadRegistroUsuario } from "../types/user-types.js";

async function findUserByEmail(email: string): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM usuario
        WHERE email=$1;         
    `, [email]);
}

async function insertUser(user: PayloadRegistroUsuario): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO usuario (nome, sobrenome, funcao, email, senha, url_imagem)
        VALUES ($1, $2, $3, $4, $5, $6);
    `, [user.nome, user.sobrenome, user.funcao, user.email, user.senha, user.url_imagem])
}

export default {
    findUserByEmail,
    insertUser
}