import { QueryResult } from "pg";
import pool from "../config/database.js";

async function insertLoan(userId: any, loan): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO emprestimo (id_usuario, id_item, data_emprestimo, data_devolucao, status)
        VALUES ($1, $2, $3, $4, $5);
    `, [userId, loan.itemId, loan.data_emprestimo, loan.data_devolucao, loan.status])
}

async function findItemById(itemId: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM item
        WHERE id = $1;
    `, [itemId])
}

async function findItemByIsbn(isbn: string): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM item
        WHERE isbn = $1
    `, [isbn])
}


async function findItemByMaterialId(material_id: number): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM item
        WHERE id_material = $1
    `, [material_id])
}

async function findLoansByItemId(itemId: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM emprestimo
        WHERE id_item = $1;
    `, [itemId])
}

async function findLoanByItemIdAndUserId(itemId: any, userId: any): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM emprestimo
        WHERE id_item = $1 AND id_usuario = $2;
    `, [itemId, userId])
}

async function deleteLoanByItemIdAndUserId(itemId: any, userId: any): Promise<QueryResult> {
    return pool.query(`
        DELETE FROM emprestimo
        WHERE id_item = $1 AND id_usuario = $2;
    `, [itemId, userId])
}

async function updateReturnDate(itemId: any, userId: any, newDate: any): Promise<QueryResult> {
    return pool.query(`
        UPDATE emprestimo
        SET data_devolucao = $3
        WHERE id_item = $1 AND id_usuario = $2;
    `, [itemId, userId, newDate])
}

async function listLoans(): Promise<QueryResult> {
    return pool.query(`
        SELECT i.*, e.*
        FROM item i
        INNER JOIN emprestimo e ON i.id = e.id_item
        WHERE e.status = true;
    `)
}

async function listBookLoans(): Promise<QueryResult> {
    return pool.query(`
        SELECT l.*, e.*
        FROM livro l
        INNER JOIN item i ON l.isbn = i.isbn
        INNER JOIN emprestimo e ON i.id = e.id_item
        WHERE e.status = true;
    `)
}

async function listMaterialLoans(): Promise<QueryResult> {
    return pool.query(`
        SELECT m.*, e.*
        FROM material_didatico m
        INNER JOIN item i ON m.id = i.id_material
        INNER JOIN emprestimo e ON i.id = e.id_item
        WHERE e.status = true;
    `)
}

export default {
    insertLoan,
    deleteLoanByItemIdAndUserId,
    findItemById,
    findItemByIsbn,
    findItemByMaterialId,
    findLoansByItemId,
    findLoanByItemIdAndUserId,
    updateReturnDate,
    listLoans,
    listBookLoans,
    listMaterialLoans
}