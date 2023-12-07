import errors from '../errors/index.js';
import sessionRepository from '../repositories/session-repository.js';
import userRepository from '../repositories/user-repository.js';
import { PayloadLoginUsuario, PayloadRegistroUsuario } from '../types/user-types.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function registerUser(user: PayloadRegistroUsuario) {
    const userExists = await userRepository.findUserByEmail(user.email)
    if (userExists.rowCount !== 0) throw errors.conflictError("user already exists")
    const hashedPassword = await bcrypt.hash(user.senha, 12);
    user.senha = hashedPassword
    await userRepository.insertUser(user);
}

async function loginUser(user: PayloadLoginUsuario) {
    const userExists = await userRepository.findUserByEmail(user.email)
    if (userExists.rowCount === 0) throw errors.invalidCredentialsError()
    await validatePasswordOrFail(user.senha, userExists.rows[0].senha)
    const userId = userExists.rows[0].id
    await sessionRepository.deleteSessionByUserId(userId)
    const tokenJWT: string = jwt.sign({ userId }, process.env.JWT_SECRET); 
    await sessionRepository.insertSession({id_usuario: userId, token: tokenJWT})
    return tokenJWT
    
}

async function validatePasswordOrFail(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw errors.invalidCredentialsError();
}

async function getUserInfo(userId: string) {
    const user = await userRepository.findUserById(userId)
    return user.rows[0]
}

async function getUserLoans(userId: string) {
    const loans = await userRepository.findUserLoans(userId)
    return loans.rows
}

async function getUserBooks(userId: string) {
    const books = await userRepository.findUserBooks(userId)
    return books.rows
}

async function getUserMaterials(userId: string) {
    const materials = await userRepository.findUserMaterials(userId)
    return materials.rows
}

async function getUserIdByEmail(email: string) {
    const user = await userRepository.findUserByEmail(email)
    return user.rows[0].id
}

export default {
    registerUser,
    loginUser,
    getUserInfo,
    getUserLoans,
    getUserBooks,
    getUserMaterials,
    getUserIdByEmail
}