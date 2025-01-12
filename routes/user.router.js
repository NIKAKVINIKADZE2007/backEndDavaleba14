const { Router } = require('express');
const {
  getAllusers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require('../services/users.services');
const isAuth = require('../middlewears/isAuth');

const userRouter = Router();

userRouter.get('/', getAllusers);

userRouter.get('/:id', getUserById);

userRouter.delete('/:id', isAuth, deleteUserById);

userRouter.put('/:id', isAuth, updateUserById);

module.exports = userRouter;
