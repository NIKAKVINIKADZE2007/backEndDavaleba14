const { default: mongoose } = require('mongoose');
const { isValidObjectId } = require('mongoose');
const expenseModel = require('../models/expense.model');
const userModel = require('../models/user.model');

const getAllexpenses = async (req, res) => {
  const expenses = await expenseModel.find();

  res.status(200).json(expenses);
};

const getExpensebyId = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'wrong id is provided' });

  const expense = await expenseModel.findById(id);

  if (!expense) return res.status(400).json({ message: 'expense not found' });

  res.status(200).json(expense);
};

const createExpense = async (req, res) => {
  const { category, description, amount, price } = req.body;
  if (!category || !description || !amount || !price)
    return res.status(400).json({ message: 'invalid params' });

  const expense = await expenseModel.create({
    category,
    description,
    amount,
    price,
    user: req.userId,
  });

  await userModel.findOneAndUpdate(
    { _id: req.userId },
    {
      $push: { expenses: expense._id },
    }
  );

  res.status(200).json(expense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'wrong id is provided' });

  const expense = await expenseModel.findById(id);

  if (expense.user[0].toString() !== req.userId)
    return res
      .status(400)
      .json({ message: 'you dont have permition to edit this expense' });

  const deletedExpense = await expenseModel.findByIdAndDelete(id);
  await userModel.updateOne({ _id: req.userId }, { $pull: { expenses: id } });

  res.json({ message: 'post deleted successfully' });
};

const editExpense = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'wrong id is provided' });

  const expense = await expenseModel.findById(id);

  if (expense.user[0].toString() !== req.userId)
    return res
      .status(400)
      .json({ message: 'you dont have permition to edit this expense' });

  const updateRequest = {};
  const { category, description, amount, price } = req.body;
  if (category) updateRequest.categort = category;
  if (description) updateRequest.description = description;
  if (amount) updateRequest.amount = amount;
  if (price) updateRequest.price = price;

  const updateExpense = await expenseModel.findByIdAndUpdate(
    id,
    updateRequest,
    { new: true }
  );

  res.json({ message: 'expense updated', updateExpense });
};
module.exports = {
  getAllexpenses,
  getExpensebyId,
  createExpense,
  deleteExpense,
  editExpense,
};
