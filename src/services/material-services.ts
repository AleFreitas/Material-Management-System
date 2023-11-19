import errors from "../errors/index.js";
import materialRepository from "../repositories/material-repository.js";
import { Livro, PayloadRegistroMaterial } from "../types/material-types.js";

async function registerBook(book: Livro) {
    const bookExists = await materialRepository.findBookByISBN(book.isbn)
    if (bookExists.rowCount !== 0) throw errors.conflictError("book already exists")

    const lowerCaseStatus = book.conservacao.toLowerCase();
    if (!(lowerCaseStatus === "otimo" || lowerCaseStatus === "bom" || lowerCaseStatus === "regular" || lowerCaseStatus === "ruim" || lowerCaseStatus === "pessimo")) {
        throw errors.invalidInputData('conservacao', book.conservacao, 'otimo, bom, regular, ruim ou pessimo');
    }
    await materialRepository.insertBook(book);
}

async function registerMaterial(material: PayloadRegistroMaterial) {
    const lowerCaseStatus = material.conservacao.toLowerCase();
    if (!(lowerCaseStatus === "otimo" || lowerCaseStatus === "bom" || lowerCaseStatus === "regular" || lowerCaseStatus === "ruim" || lowerCaseStatus === "pessimo")) {
        throw errors.invalidInputData('conservacao', material.conservacao, 'otimo, bom, regular, ruim ou pessimo');
    }
    const materialCategoryExists = await materialRepository.findMaterialCategoryById(material.id_categoria_material)
    if (materialCategoryExists.rowCount === 0) throw errors.notFoundAtQueryError(`id ${material.id_categoria_material}`, 'categoria_material')
    await materialRepository.insertMaterial(material);
}



export default {
    registerBook,
    registerMaterial,
}