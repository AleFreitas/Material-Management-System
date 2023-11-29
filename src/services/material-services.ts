import errors from "../errors/index.js";
import materialRepository from "../repositories/material-repository.js";
import { Livro, PayloadRegisterAuthor, PayloadRegisterBookAuthor, PayloadRegistroMaterial } from "../types/material-types.js";

async function registerBook(book: Livro) {
    const bookExists = await materialRepository.findBookByISBN(book.isbn)
    if (bookExists.rowCount !== 0) throw errors.conflictError("book already exists")

    const lowerCaseStatus = book.conservacao.toLowerCase();
    if (!(lowerCaseStatus === "otimo" || lowerCaseStatus === "bom" || lowerCaseStatus === "regular" || lowerCaseStatus === "ruim" || lowerCaseStatus === "pessimo")) {
        throw errors.invalidInputData('conservacao', book.conservacao, 'otimo, bom, regular, ruim ou pessimo');
    }
    await materialRepository.insertBook(book);
    await materialRepository.insertBookItem(book.isbn)
}

async function updateBook(newBookData, bookISBN: string) {
    if(newBookData.conservacao !== undefined){
        const lowerCaseStatus = newBookData.conservacao.toLowerCase();
        if (!(lowerCaseStatus === "otimo" || lowerCaseStatus === "bom" || lowerCaseStatus === "regular" || lowerCaseStatus === "ruim" || lowerCaseStatus === "pessimo")) {
            throw errors.invalidInputData('conservacao', newBookData.conservacao, 'otimo, bom, regular, ruim ou pessimo');
        }
    }

    const bookExists = await materialRepository.findBookByISBN(bookISBN)
    if(bookExists.rowCount === 0) throw errors.notFoundAtQueryError(`ISBN ${bookISBN}`, 'livro')
    
    if(bookISBN !== newBookData.isbn) {
        const newBookISBNAvailable = await materialRepository.findBookByISBN(newBookData.isbn)
        if(newBookISBNAvailable.rowCount !== 0) throw errors.conflictError('you are trying to change this book isbn to one that is being used')
    }

    const originalBookData = bookExists.rows[0]
    const bookData = await updateData(newBookData, originalBookData)
    await materialRepository.updateBook(bookData, bookISBN)
}

async function updateMaterial(newMaterialData, originalId) {
    if(newMaterialData.conservacao !== undefined){
        const lowerCaseStatus = newMaterialData.conservacao.toLowerCase();
        if (!(lowerCaseStatus === "otimo" || lowerCaseStatus === "bom" || lowerCaseStatus === "regular" || lowerCaseStatus === "ruim" || lowerCaseStatus === "pessimo")) {
            throw errors.invalidInputData('conservacao', newMaterialData.conservacao, 'otimo, bom, regular, ruim ou pessimo');
        }
    }
    
    const materialExists = await materialRepository.findMaterialById(originalId)
    if (materialExists.rowCount === 0) throw errors.notFoundAtQueryError(`id ${originalId}`, 'material')

    if(originalId !== newMaterialData.id) {
        const newMaterialIdAvailable = await materialRepository.findMaterialById(newMaterialData.id)
        if(newMaterialIdAvailable.rowCount !== 0) throw errors.conflictError('you are trying to change this material id to one that is being used')
    }

    const materialCategoryExists = await materialRepository.findMaterialCategoryById(newMaterialData.id_categoria_material)
    if (materialCategoryExists.rowCount === 0) throw errors.notFoundAtQueryError(`id ${newMaterialData.id_categoria_material}`, 'categoria_material')
    
    const originalMaterialData = materialExists.rows[0]
    const materialData = await updateData(newMaterialData, originalMaterialData)
    await materialRepository.updateMaterial(materialData, originalId)
}

async function deleteBook(isbn: string) {
    const bookExists = await materialRepository.findBookByISBN(isbn)
    if(bookExists.rowCount === 0) throw errors.notFoundAtQueryError(`ISBN ${isbn}`, 'livro')
    await materialRepository.deleteBookItem(isbn)
    await materialRepository.deleteBook(isbn)
}

async function deleteMaterial(id) {
    const materialExists = await materialRepository.findMaterialById(id)
    if (materialExists.rowCount === 0) throw errors.notFoundAtQueryError(`id ${id}`, 'material')
    await materialRepository.deleteMaterialItem(id)
    await materialRepository.deleteMaterial(id)
}


async function registerMaterial(material: PayloadRegistroMaterial) {
    const lowerCaseStatus = material.conservacao.toLowerCase();
    if (!(lowerCaseStatus === "otimo" || lowerCaseStatus === "bom" || lowerCaseStatus === "regular" || lowerCaseStatus === "ruim" || lowerCaseStatus === "pessimo")) {
        throw errors.invalidInputData('conservacao', material.conservacao, 'otimo, bom, regular, ruim ou pessimo');
    }
    const materialCategoryExists = await materialRepository.findMaterialCategoryById(material.id_categoria_material)
    if (materialCategoryExists.rowCount === 0) throw errors.notFoundAtQueryError(`id ${material.id_categoria_material}`, 'categoria_material')

    const materialResponse = await materialRepository.insertMaterial(material);
    await materialRepository.insertMaterialItem(materialResponse.rows[0].id)
}

async function registerAuthor(author: PayloadRegisterAuthor) {
    const authorExists = await materialRepository.findAuthorByEmail(author.email)
    if(authorExists.rowCount !== 0) throw errors.conflictError('email already being used')
    
    await materialRepository.insertAuthor(author)
}

async function updateAuthor(author: Partial<PayloadRegisterAuthor>, authorId: any) {
    const authorExists = await materialRepository.findAuthorById(authorId)
    if(authorExists.rowCount === 0) throw errors.notFoundError()
    if(author.email) {
        if(authorExists.rows[0].email !== author.email){
            const newEmailAvailable = await materialRepository.findAuthorByEmail(author.email)
            if(newEmailAvailable.rowCount !== 0) throw errors.conflictError('you are trying to change this email to one that is being used')
        }
    }
    const authorData = updateData(author, authorExists.rows[0])
    await materialRepository.updateAuthor(authorData, authorId)
}

async function deleteAuthor(id: any) {
    const authorExists = await materialRepository.findAuthorById(id)
    if(authorExists.rowCount === 0) throw errors.notFoundError()

    await materialRepository.deleteAuthor(id)
}

async function registerBookAuthor(body: PayloadRegisterBookAuthor) {
    const relationExists = await materialRepository.findBookAuthorRelation(body.id_autor, body.isbn)
    if(relationExists.rowCount !== 0) throw errors.conflictError("this user is already an author of this book")

    const authorExists = await materialRepository.findAuthorById(body.id_autor)
    if(authorExists.rowCount === 0) throw errors.notFoundError()

    const bookExists = await materialRepository.findBookByISBN(body.isbn)
    if(bookExists.rowCount === 0) throw errors.notFoundError()
    
    await materialRepository.insertBookAuthor(body.id_autor, body.isbn)
}

async function deleteBookAuthor(id: any, isbn: any) {
    const bookAuthorExists = await materialRepository.findBookAuthorRelation(id, isbn)
    if(bookAuthorExists.rowCount === 0) throw errors.notFoundError()

    await materialRepository.deleteBookAuthor(id, isbn)
}

async function registerMaterialCategory(name: string) {
    const categoryExists = await materialRepository.findMaterialCategoryByName(name)
    if(categoryExists.rowCount !== 0) throw errors.conflictError("this category name is in use")

    await materialRepository.insertMaterialCategory(name)
}

async function deleteMaterialCategory(name: string) {
    const categoryExists = await materialRepository.findMaterialCategoryByName(name)
    if(categoryExists.rowCount === 0) throw errors.conflictError("this category name is not in use")

    await materialRepository.deleteMaterialCategory(name)
}

async function registerBookCategory(name: string) {
    const categoryExists = await materialRepository.findBookCategoryByName(name)
    if(categoryExists.rowCount !== 0) throw errors.conflictError("this category name is in use")

    await materialRepository.insertBookCategory(name)
}

async function deleteBookCategory(name: string) {
    const categoryExists = await materialRepository.findBookCategoryByName(name)
    if(categoryExists.rowCount === 0) throw errors.conflictError("this category name is in use")

    await materialRepository.deleteBookCategory(name)
}


function updateData(newData: any, originalData: any): any {
    const updatedData = { ...newData };

    for (const key in originalData) {
        if (!(key in updatedData) || !updatedData[key]) {
            updatedData[key] = originalData[key];
        }
    }
    return updatedData;
}

async function getAllBooks() {
    const books = await materialRepository.findAllBooks()
    return books.rows
}

async function getAllMaterials() {
    const materials = await materialRepository.findAllMaterials()
    return materials.rows
}

async function getBookByIsbn(isbn: string) {
    const book = await materialRepository.findBookByISBN(isbn)
    return book.rows[0]
}

async function getMaterialById(id: any) {
    const material = await materialRepository.findMaterialById(id)
    return material.rows[0]
}

async function getBooksByAuthor(authorId: string) {
    const books = await materialRepository.findBooksByAuthor(authorId)
    return books.rows
}

async function getBooksByCategory(categoryId: string) {
    const books = await materialRepository.findBooksByCategory(categoryId)
    return books.rows
}

async function getMaterialsByCategory(categoryId: string) {
    const materials = await materialRepository.findMaterialsByCategory(categoryId)
    return materials.rows
}

async function getUserInfo(userId: string) {
    const user = await materialRepository.findUserById(userId)
    return user.rows[0]
}

async function getUserLoans(userId: string) {
    const loans = await materialRepository.findUserLoans(userId)
    return loans.rows
}

async function getUserBooks(userId: string) {
    const books = await materialRepository.findUserBooks(userId)
    return books.rows
}

async function getUserMaterials(userId: string) {
    const materials = await materialRepository.findUserMaterials(userId)
    return materials.rows
}

export default {
    getAllBooks,
    getAllMaterials,
    getBookByIsbn,
    getMaterialById,
    registerBook,
    registerMaterial,
    registerAuthor,
    registerBookAuthor,
    registerMaterialCategory,
    registerBookCategory,
    updateBook,
    updateMaterial,
    updateAuthor,
    deleteBook,
    deleteMaterial,
    deleteAuthor,
    deleteBookAuthor,
    deleteMaterialCategory,
    deleteBookCategory,
    getBooksByAuthor,
    getBooksByCategory,
    getMaterialsByCategory,
    getUserInfo,
    getUserLoans,
    getUserBooks,
    getUserMaterials

}