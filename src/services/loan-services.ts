import errors from "../errors/index.js";
import loanRepository from "../repositories/loan-repository.js";
import materialRepository from "../repositories/material-repository.js";
import { Usuario } from "../types/user-types.js";

async function registerLoan(itemId: any, usuario: Usuario) {
  let item = await loanRepository.findItemByIsbn(itemId);
  if (item.rowCount === 0) {
    item = await loanRepository.findItemByMaterialId(itemId);
    if (item.rowCount === 0) {
      throw errors.notFoundError();
    }
  }
  itemId = item.rows[0].id;

  const userAlreadyLoanedThisItem =
    await loanRepository.findLoanByItemIdAndUserId(itemId, usuario.id);
  if (userAlreadyLoanedThisItem.rowCount !== 0)
    throw errors.loanInProgressError();

  const data_emprestimo = new Date();
  const data_devolucao = new Date(data_emprestimo);
  data_devolucao.setDate(data_devolucao.getDate() + 30);
  const loan = { itemId, data_emprestimo, data_devolucao, status: true };

  const itemExists = await loanRepository.findItemById(itemId);
  if (itemExists.rowCount === 0) throw errors.notFoundError();
  const loans = await loanRepository.findLoansByItemId(itemId);

  if (item.rows[0].isbn) {
    console.log("alugando livro");
    const bookExists = await materialRepository.findBookByISBN(
      item.rows[0].isbn
    );
    if (bookExists.rowCount === 0) throw errors.notFoundError();
    if (loans.rowCount >= bookExists.rows[0].quantidade)
      throw errors.notEnoughItemsError();
  } else if (item.rows[0].id_material) {
    console.log("alugando material");
    const materialExists = await materialRepository.findMaterialById(
      item.rows[0].id_material
    );
    if (materialExists.rowCount === 0) throw errors.notFoundError();
    if (loans.rowCount >= materialExists.rows[0].quantidade)
      throw errors.notEnoughItemsError();
  }

  await loanRepository.insertLoan(usuario.id, loan);
}

async function completeLoan(itemId: any, usuario: Usuario) {
  let item = await loanRepository.findItemByIsbn(itemId);
  if (item.rowCount === 0) {
    item = await loanRepository.findItemByMaterialId(itemId);
    if (item.rowCount === 0) {
      throw errors.notFoundError();
    }
  }
  itemId = item.rows[0].id;

  const userLoanedThisItem = await loanRepository.findLoanByItemIdAndUserId(
    itemId,
    usuario.id
  );
  if (userLoanedThisItem.rowCount === 0) throw errors.notFoundError();

  const today = new Date();
  const dataDevolucao = new Date(userLoanedThisItem.rows[0].data_devolucao);
  const timeDiff = dataDevolucao.getTime() - today.getTime();
  const differenceInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (differenceInDays < 0) throw errors.pendingFineError();

  await loanRepository.deleteLoanByItemIdAndUserId(itemId, usuario.id);
}

async function renewLoan(itemId: any, usuario: Usuario) {
  let item = await loanRepository.findItemByIsbn(itemId);
  if (item.rowCount === 0) {
    item = await loanRepository.findItemByMaterialId(itemId);
    if (item.rowCount === 0) {
      throw errors.notFoundError();
    }
  }
  itemId = item.rows[0].id;

  const userLoanedThisItem = await loanRepository.findLoanByItemIdAndUserId(
    itemId,
    usuario.id
  );
  if (userLoanedThisItem.rowCount === 0) throw errors.notFoundError();

  const today = new Date();
  const dataDevolucao = new Date(userLoanedThisItem.rows[0].data_devolucao);
  const timeDiff = dataDevolucao.getTime() - today.getTime();
  const differenceInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (differenceInDays < 0) throw errors.pendingFineError();

  dataDevolucao.setDate(today.getDate() + 20); // set the new date to 20 days from today

  await loanRepository.updateReturnDate(itemId, usuario.id, dataDevolucao);
}
async function listLoans(userId: number) {
  const loans = await loanRepository.listUserLoans(userId);
  const loansData: any[] = [];

  for (const i of loans.rows) {
    if (i.isbn === null) {
      console.log("material");
      console.log(i);
      const loan = await loanRepository.listMaterialInfoByItemId(i.item_id);
      loansData.push(loan.rows[0]);
    } else {
      console.log("book");
      console.log(i);
      const loan = await loanRepository.listBookInfoByItemId(i.item_id);
      loansData.push(loan.rows[0]);
    }
  }
  return loansData;
}

async function listBookLoans() {
  const loans = await loanRepository.listBookLoans();
  return loans.rows;
}

async function listMaterialLoans() {
  const loans = await loanRepository.listMaterialLoans();
  return loans.rows;
}

export default {
  registerLoan,
  completeLoan,
  renewLoan,
  listLoans,
  listBookLoans,
  listMaterialLoans,
};
