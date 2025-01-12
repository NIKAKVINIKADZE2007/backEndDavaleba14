const { isValidObjectId } = require('mongoose');
const userModel = require('../models/user.model');
const expenseModel = require('../models/expense.model');

const getAllusers = async (req, res) => {
  const data = await userModel.find().select('-password');

  res.status(200).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'not a valid id' });

  const user = await userModel.findById(id).select('-password');
  if (!user) return res.status(404).json({ message: 'user not found' });
  res.json(user);
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'wrong user id is provided' });

  console.log(id);
  if (id !== req.userId)
    return res.status(401).json({ message: 'unauthorized' });

  const deletedUser = await userModel.findByIdAndDelete(req.userId);
  await expenseModel.deleteMany({ user: req.userId });

  res.json({ message: 'user deleted successfully' });
};

const updateUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'wrong user id is provided' });
  if (id !== req.userId)
    return res.status(401).json({ message: 'unauthorized' });

  const { email, name, lastName, password } = req.body;
  const updateRequest = {};
  if (email) updateRequest.email = email;
  if (name) updateRequest.name = name;
  if (lastName) updateRequest.lastName = lastName;
  if (password) updateRequest.password = password;

  const updatedUser = await userModel.findByIdAndUpdate(
    req.userId,
    updateRequest,
    { new: true }
  );

  res.json({ message: 'user updated successfully', data: updatedUser });
};
module.exports = { getAllusers, getUserById, deleteUserById, updateUserById };
