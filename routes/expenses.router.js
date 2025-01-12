const { Router } = require('express');
const {
  getAllexpenses,
  createExpense,
  deleteExpense,
  editExpense,
  getExpensebyId,
} = require('../services/expenses.services');
const isAuth = require('../middlewears/isAuth');

const expenseRouter = Router();

expenseRouter.get('/', getAllexpenses);

expenseRouter.get('/:id', getExpensebyId);

expenseRouter.post('/', createExpense);

expenseRouter.delete('/:id', deleteExpense);

expenseRouter.put('/:id', editExpense);

module.exports = expenseRouter;
