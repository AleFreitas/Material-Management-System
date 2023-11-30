import { QueryResult } from "pg";
import pool from "../config/database.js";
import { PayloadRegistroUsuario, Usuario } from "../types/user-types.js";

async function findUserByEmail(email: string): Promise<QueryResult<Usuario>> {
  return pool.query(
    `
        SELECT * FROM usuario
        WHERE email=$1;         
    `,
    [email]
  );
}

async function findUserById(id): Promise<QueryResult<Usuario>> {
  return pool.query(
    `
        SELECT * FROM usuario
        WHERE id=$1;         
    `,
    [id]
  );
}

async function insertUser(user: PayloadRegistroUsuario): Promise<QueryResult> {
  return pool.query(
    `
        INSERT INTO usuario (nome, sobrenome, funcao, email, senha, url_imagem)
        VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [
      user.nome,
      user.sobrenome,
      user.funcao,
      user.email,
      user.senha,
      user.url_imagem,
    ]
  );
}

async function findUserLoans(userId: string): Promise<QueryResult> {
  return pool.query(
    `
        SELECT * FROM emprestimo
        WHERE id_usuario=$1;         
    `,
    [userId]
  );
}

async function findUserBooks(userId: string): Promise<QueryResult> {
  return pool.query(
    `
        SELECT l.*
        FROM usuario u
        INNER JOIN emprestimo e ON u.id = e.id_usuario
        INNER JOIN item i ON e.id_item = i.id
        INNER JOIN livro l ON i.isbn = l.isbn
        WHERE u.id = $1;         
    `,
    [userId]
  );
}

async function findUserMaterials(userId: string): Promise<QueryResult> {
  return pool.query(
    `
        SELECT m.*
        FROM usuario u
        INNER JOIN emprestimo e ON u.id = e.id_usuario
        INNER JOIN item i ON e.id_item = i.id
        INNER JOIN material_didatico m ON i.id_material = m.id
        WHERE u.id = $1;
    `,
    [userId]
  );
}

export default {
  findUserByEmail,
  findUserById,
  insertUser,
  findUserLoans,
  findUserBooks,
  findUserMaterials,
};
