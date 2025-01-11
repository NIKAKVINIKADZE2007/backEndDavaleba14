const { Router } = require('express');
const { getAllusers, getUserById } = require('../services/users.services');

const userRouter = Router();

userRouter.get('/', getAllusers);

userRouter.get('/:id', getUserById);

module.exports = userRouter;
