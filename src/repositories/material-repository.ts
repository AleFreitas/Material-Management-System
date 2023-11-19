import pool from "../config/database.js"
import { QueryResult } from "pg";
import { Livro, PayloadRegistroMaterial } from "../types/material-types.js";

async function findMaterialById(id: number): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM material_didatico
        WHERE id = $1
    `,[id])
}

async function findMaterialCategoryById(id: number): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM categoria_material
        WHERE id = $1
    `,[id])
}

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

async function insertMaterial(material: PayloadRegistroMaterial): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO material_didatico ("desc", "data_Aquisicao", conservacao, localizacao, quantidade, serial, url_imagem, id_categoria_material)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [material.desc, material.data_Aquisicao, material.conservacao, material.localizacao, material.quantidade, material.serial, material.url_imagem, material.id_categoria_material])
}

async function updateBook(book: any, originalISBN: any): Promise<QueryResult> {
    return pool.query(`
        UPDATE livro 
        SET isbn = $1, descricao = $2, data_aquisicao = $3, conservacao = $4, localizacao = $5, quantidade = $6, titulo = $7, url_capa = $8
        WHERE isbn = $9
    `, [book.isbn, book.descricao, book.data_aquisicao, book.conservacao, book.localizacao, book.quantidade, book.titulo, book.url_capa, originalISBN])
}

export default {
    insertBook,
    insertMaterial,
    findBookByISBN,
    findMaterialCategoryById,
    findMaterialById,
    updateBook,
}