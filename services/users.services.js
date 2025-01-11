const { isValidObjectId } = require('mongoose');
const userModel = require('../models/user.model');

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

module.exports = { getAllusers, getUserById };
