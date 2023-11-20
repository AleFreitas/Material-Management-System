import errors from "../errors/index.js";
import materialRepository from "../repositories/material-repository.js";
import { Livro, PayloadRegisterAuthor, PayloadRegistroMaterial } from "../types/material-types.js";

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

function updateData(newData: any, originalData: any): any {
    const updatedData = { ...newData };

    for (const key in originalData) {
        if (!(key in updatedData) || !updatedData[key]) {
            updatedData[key] = originalData[key];
        }
    }
    return updatedData;
}

async function registerAuthor(author: PayloadRegisterAuthor) {
    const authorExists = await materialRepository.findAuthorByEmail(author.email)
    if(authorExists.rowCount !== 0) throw errors.conflictError('email already being used')
    
    await materialRepository.insertAuthor(author)
}

export default {
    registerBook,
    registerMaterial,
    registerAuthor,
    updateBook,
    updateMaterial,
    deleteBook,
    deleteMaterial,
}