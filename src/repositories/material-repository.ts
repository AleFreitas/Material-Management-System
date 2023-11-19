import pool from "../config/database.js"
import { QueryResult } from "pg";
import { Livro } from "../types/material-types.js";

async function findBookByISBN(isbn: string): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM livro 
        WHERE isbn = $1
    `,[isbn])
}

async function insertBook(book: Livro): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO livro (isbn, descricao, data_aquisicao, conservacao, localizacao, quantidade, titulo, url_capa)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [book.isbn, book.descricao, book.data_aquisicao, book.conservacao, book.localizacao, book.quantidade, book.titulo, book.url_capa])
}

export default {
    insertBook,
    findBookByISBN
}