import pool from "../config/database.js"
import { QueryResult } from "pg";
import { Author, Livro, PayloadRegisterAuthor, PayloadRegistroMaterial } from "../types/material-types.js";

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

async function findAuthorByEmail(email: string): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM autor
        WHERE email = $1
    `,[email])
}

async function findAuthorById(id: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM autor
        WHERE id = $1
    `,[id])
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `, [material.desc, material.data_Aquisicao, material.conservacao, material.localizacao, material.quantidade, material.serial, material.url_imagem, material.id_categoria_material])
}

async function insertBookItem(isbn: any): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO item (isbn)
        VALUES ($1);
    `, [isbn])
}

async function insertMaterialItem(id_material: any): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO item (id_material)
        VALUES ($1);
    `, [id_material])
}

async function insertAuthor(author: PayloadRegisterAuthor): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO autor (nome, sobrenome, email)
        VALUES ($1, $2, $3);
    `, [author.nome, author.sobrenome, author.email])
}

async function updateBook(book: any, originalISBN: any): Promise<QueryResult> {
    return pool.query(`
        UPDATE livro 
        SET isbn = $1, descricao = $2, data_aquisicao = $3, conservacao = $4, localizacao = $5, quantidade = $6, titulo = $7, url_capa = $8
        WHERE isbn = $9
    `, [book.isbn, book.descricao, book.data_aquisicao, book.conservacao, book.localizacao, book.quantidade, book.titulo, book.url_capa, originalISBN])
}

async function updateMaterial(material: any, originalId: any): Promise<QueryResult> {
    return pool.query(`
        UPDATE material_didatico
        SET id = $1, "desc" = $2, "data_Aquisicao" = $3, conservacao = $4, localizacao = $5, quantidade = $6, serial = $7, url_imagem = $8, id_categoria_material = $9
        WHERE id = $10
    `, [material.id, material.desc, material.data_Aquisicao, material.conservacao, material.localizacao, material.quantidade, material.serial, material.url_imagem, material.id_categoria_material, originalId])
}

async function updateAuthor(author: PayloadRegisterAuthor, authorId: any): Promise<QueryResult> {
    return pool.query(`
        UPDATE autor
        SET nome = $1, sobrenome = $2, email = $3
        WHERE id = $4;
    `, [author.nome, author.sobrenome, author.email, authorId])
}

async function deleteBook(isbn): Promise<QueryResult> {
    return pool.query(`
        DELETE FROM livro 
        WHERE isbn = $1
    `, [isbn])
}

async function deleteBookItem(isbn): Promise<QueryResult> {
    return pool.query(`
        DELETE FROM item 
        WHERE isbn = $1
    `, [isbn])
}

async function deleteMaterial(id): Promise<QueryResult> {
    return pool.query(`
        DELETE FROM material_didatico
        WHERE id = $1
    `, [id])
}

async function deleteMaterialItem(id): Promise<QueryResult> {
    return pool.query(`
        DELETE FROM item
        WHERE id_material = $1
    `, [id])
}

async function deleteAuthor(id): Promise<QueryResult> {
    return pool.query(`
        DELETE FROM autor
        WHERE id = $1
    `, [id])
}

export default {
    insertBook,
    insertBookItem,
    insertMaterial,
    insertMaterialItem,
    insertAuthor,
    findBookByISBN,
    findMaterialCategoryById,
    findMaterialById,
    findAuthorByEmail,
    findAuthorById,
    updateBook,
    updateMaterial,
    updateAuthor,
    deleteBook,
    deleteBookItem,
    deleteMaterial,
    deleteMaterialItem,
    deleteAuthor,
}