import errors from "../errors/index.js";
import loanRepository from "../repositories/loan-repository.js";
import materialRepository from "../repositories/material-repository.js";
import { Usuario } from "../types/user-types.js";

async function registerLoan(itemId: any, usuario: Usuario) {
    const userAlreadyLoanedThisItem = await loanRepository.findLoanByItemIdAndUserId(itemId, usuario.id)
    if(userAlreadyLoanedThisItem.rowCount !== 0) throw errors.loanInProgressError()

    const data_emprestimo = new Date()
    const data_devolucao = new Date(data_emprestimo);
    data_devolucao.setDate(data_devolucao.getDate() + 30);
    const loan = {itemId, data_emprestimo, data_devolucao, status: true}

    const itemExists = await loanRepository.findItemById(itemId)
    if(itemExists.rowCount === 0 ) throw errors.notFoundError()
    const item = itemExists.rows[0]
    console.log('item Exists')
    const loans = await loanRepository.findLoansByItemId(itemId)

    if(item.isbn) {
        console.log('alugando livro')
        const bookExists = await materialRepository.findBookByISBN(item.isbn)
        if(bookExists.rowCount === 0) throw errors.notFoundError()
        if(loans.rowCount >= bookExists.rows[0].quantidade) throw errors.notEnoughItemsError()
    } else if (item.id_material) {
        console.log('alugando material')
        const materialExists = await materialRepository.findMaterialById(item.id_material)
        if(materialExists.rowCount === 0) throw errors.notFoundError()
        if(loans.rowCount >= materialExists.rows[0].quantidade) throw errors.notEnoughItemsError()
    }

    await loanRepository.insertLoan(usuario.id, loan)
}

export default {
    registerLoan,
}