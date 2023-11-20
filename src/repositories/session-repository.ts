import pool from "../config/database.js"
import { QueryResult } from "pg";
import { RegistroSessao } from "../types/session-types.js";

async function findSessionByToken(token: string): Promise<QueryResult> {
    return pool.query(`
        SELECT * FROM sessao
        WHERE token = $1
    `, [token])
}

async function insertSession(session: RegistroSessao): Promise<QueryResult> {
    return pool.query(`
        INSERT INTO sessao (id_usuario,token)
        VALUES ($1, $2);
    `, [session.id_usuario, session.token])
}

async function deleteSessionByUserId(userId: number): Promise<QueryResult> {
    return pool.query(`
        DELETE FROM sessao
        WHERE id_usuario = ($1);
    `, [userId])
}

export default {
    insertSession,
    deleteSessionByUserId,
    findSessionByToken,
}