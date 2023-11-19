import errors from "../errors/index.js";
import materialRepository from "../repositories/material-repository.js";
import { Livro } from "../types/material-types.js";

async function registerBook(book: Livro) {
    const bookExists = await materialRepository.findBookByISBN(book.isbn)
    if (bookExists.rowCount !== 0) throw errors.conflictError("book already exists")

    const lowerCaseStatus = book.conservacao.toLowerCase();
    if (!(lowerCaseStatus === "otimo" || lowerCaseStatus === "bom" || lowerCaseStatus === "regular" || lowerCaseStatus === "ruim" || lowerCaseStatus === "pessimo")) {
        throw errors.invalidInputData('conservacao', book.conservacao, 'otimo, bom, regular, ruim ou pessimo');
    }
    await materialRepository.insertBook(book);
}


export default {
    registerBook,
}