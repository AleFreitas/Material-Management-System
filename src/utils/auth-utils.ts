import errors from "../errors/index.js";
import sessionRepository from "../repositories/session-repository.js";
import userRepository from "../repositories/user-repository.js";
import { Usuario } from "../types/user-types.js";

async function authenticateUser(req): Promise<Usuario> {
    const authorization = req.headers.authorization;
    if(authorization === undefined) throw errors.invalidTokenError()
    const token = authorization.replace('Bearer ', '');
    if(token === "" || token === undefined) throw errors.invalidTokenError()
    const tokenExists = await sessionRepository.findSessionByToken(token)
    if(tokenExists.rowCount === 0) throw errors.invalidTokenError()
    const userExists = await userRepository.findUserById(tokenExists.rows[0].id_usuario)
    if(userExists.rowCount === 0) throw errors.invalidTokenError()
    const usuario = userExists.rows[0]
    return usuario
}

async function authenticateUserSameId(req, id): Promise<Usuario> {
    const usuario = await authenticateUser(req); 
    return usuario; 
}


function isUserAdmin(user: Usuario){
    const funcao = user.funcao.toLowerCase()
    if(funcao === "admin" || funcao === "administrador" || funcao === "chefe" || funcao === "chefe de laboratorio") return true
    return false
}

export default {
    authenticateUser,
    isUserAdmin,
    authenticateUserSameId
}