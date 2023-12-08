import { QueryResult } from "pg";
import pool from "../config/database.js";
import { Livro, PayloadRegisterAuthor, PayloadRegistroMaterial } from "../types/material-types.js";

async function findMaterialById(id: number): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM material_didatico
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

async function findBookAuthorRelation(id: any, isbn: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM autor_livro
        WHERE id_autor = $1 AND isbn = $2
    `,[id, isbn])
}

async function findMaterialCategoryByName(name:string): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM categoria_material
        WHERE nome = $1
    `,[name])
}

async function findBookCategoryByName(name:string): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM categoria_livro
        WHERE nome = $1
    `,[name])
}

async function findMaterialCategoryById(id: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM categoria_material
        WHERE id = $1
    `,[id])
}

async function findBookCategoryById(id: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM categoria_livro
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

async function insertBookAuthor(id: any, isbn: any): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO autor_livro (id_autor, isbn)
        VALUES ($1, $2);
    `, [id, isbn])
}

async function insertMaterialCategory(name: string): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO categoria_material (nome)
        VALUES ($1);
    `, [name])
}

async function insertBookCategory(name: string): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO categoria_livro (nome)
        VALUES ($1);
    `, [name])
}

async function linkBookToCategory(isbn: string, category_id: number): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO relacao_categoria_livro (id_categoria_livro, isbn)
        VALUES ($1, $2)
    `,[category_id, isbn])
}

async function findBookCategoryRelation(isbn: string, category_id: number): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM relacao_categoria_livro 
        WHERE id_categoria_livro = $1 AND isbn = $2
    `,[category_id, isbn])
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

async function deleteBookAuthor(id_autor: any, isbn: any) {
    return pool.query(`
        DELETE FROM autor_livro
        WHERE id_autor = $1 AND isbn = $2 
    `, [id_autor, isbn])
}

async function deleteMaterialCategory(name: string) {
    return pool.query(`
        DELETE FROM categoria_material
        WHERE nome = $1 
    `, [name])
}

async function deleteBookCategory(name: string) {
    return pool.query(`
        DELETE FROM categoria_livro
        WHERE nome = $1 
    `, [name])
}

async function findAllBooks(): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM livro
    `)
}

async function findAllMaterials(): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM material_didatico
    `)
}

async function findBooksByAuthor(authorId: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM livro
        WHERE isbn IN (
            SELECT isbn FROM autor_livro
            WHERE id_autor = $1
        )
    `, [authorId])
}

async function findMaterialsByCategory(categoryId: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM material_didatico
        WHERE id_categoria_material = $1
    `, [categoryId])
}

async function findBooksByCategory(categoryId: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM livro
        WHERE isbn IN (
            SELECT isbn FROM relacao_categoria_livro
            WHERE id_categoria_livro = $1
        )
    `, [categoryId])
}


async function findUserById(id: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM usuario
        WHERE id = $1
    `, [id])
}

async function findUserLoans(id: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM emprestimo
        WHERE id_usuario = $1
    `, [id])
}

async function findUserBooks(id: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM livro
        WHERE isbn IN (
            SELECT isbn FROM emprestimo
            WHERE id_usuario = $1
        )
    `, [id])
}

async function findUserMaterials(id: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM material_didatico
        WHERE id IN (
            SELECT id_material FROM emprestimo
            WHERE id_usuario = $1
        )
    `, [id])
}

async function findAllAuthors(): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM autor
    `)
}

async function findAllBookCategories(): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM categoria_livro
    `)
}

async function findAllMaterialCategories(): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM categoria_material
    `)
}

async function findAuthorsByBook(isbn: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM autor
        WHERE id IN (
            SELECT id_autor FROM autor_livro
            WHERE isbn = $1
        )
    `, [isbn])
}

async function findBookCategories(isbn: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM categoria_livro
        WHERE id IN (
            SELECT id_categoria_livro FROM relacao_categoria_livro
            WHERE isbn = $1
        )
    `, [isbn])
}

async function findMaterialCategories(id: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM categoria_material
        WHERE id IN (
            SELECT id_categoria_material FROM material_didatico
            WHERE id = $1
        )
    `, [id])
}

export default {
    insertBook,
    insertBookItem,
    insertMaterial,
    insertMaterialItem,
    insertAuthor,
    insertBookAuthor,
    insertMaterialCategory,
    linkBookToCategory,
    insertBookCategory,
    findAllBooks,
    findAllMaterials,
    findBookByISBN,
    findMaterialById,
    findAuthorByEmail,
    findAuthorById,
    findBookAuthorRelation,
    findMaterialCategoryByName,
    findBookCategoryByName,
    findMaterialCategoryById,
    findBookCategoryById,
    updateBook,
    updateMaterial,
    updateAuthor,
    deleteBook,
    deleteBookItem,
    deleteMaterial,
    deleteMaterialItem,
    deleteAuthor,
    deleteBookAuthor,
    deleteMaterialCategory,
    deleteBookCategory,
    findBooksByAuthor,
    findBookCategoryRelation,
    findBooksByCategory,
    findMaterialsByCategory,
    findUserById,
    findUserLoans,
    findUserBooks,
    findUserMaterials,
    findAllAuthors,
    findAllBookCategories,
    findAllMaterialCategories,
    findAuthorsByBook,
    findBookCategories,
    findMaterialCategories
}