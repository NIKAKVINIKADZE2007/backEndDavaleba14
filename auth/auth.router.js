const { Router } = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authRouter = Router();

authRouter.post('/sign-up', async (req, res) => {
  const { name, lastName, email, password } = req.body;

  if (!name || !lastName || !email || !password)
    res.status(404).json({ message: 'invalid params' });

  const user = await userModel.findOne({ email });
  if (user) return res.status(400).json({ message: 'user already exists' });

  const hasedPassword = await bcrypt.hash(password, 10);
  await userModel.create({ name, lastName, email, password: hasedPassword });

  res.status(201).json({ message: 'user created' });
});

authRouter.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'password and email is required' });

  const user = await userModel.findOne({ email });

  if (!user) res.status(400).json({ message: 'email or password incorect' });

  const checkPassword = bcrypt.compare(password, user.password);
  if (!checkPassword)
    return res.status(400).json({ message: 'email or password incorect' });

  const payLoad = {
    userId: user._id,
  };

  const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json(token);
});

module.exports = authRouter;
