import pool from "../config/database.js"
import { QueryResult } from "pg";
import { Livro, PayloadRegistroMaterial } from "../types/material-types.js";

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

export default {
    insertLoan,
    deleteLoanByItemIdAndUserId,
    findItemById,
    findLoansByItemId,
    findLoanByItemIdAndUserId
}