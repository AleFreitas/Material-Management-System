import errors from '../errors/index.js';
import userRepository from '../repositories/user-repository.js';
import { PayloadRegistroUsuario } from '../types/user-types.js';
import bcrypt from 'bcrypt';

async function registerUser(user: PayloadRegistroUsuario) {
    const userExists = await userRepository.findUserByEmail(user.email)
    if (userExists.rowCount !== 0) throw errors.conflictError("user already exists")
    const hashedPassword = await bcrypt.hash(user.senha, 12);
    user.senha = hashedPassword
    console.log(user)
    await userRepository.insertUser(user);
}

export default {
    registerUser
}