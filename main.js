const express = require('express');
const conectToDb = require('./db/conectToDb');
const authRouter = require('./auth/auth.router');
const userRouter = require('./routes/user.router');
const expenseRouter = require('./routes/expenses.router');

const app = express();
conectToDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello go to /expenses');
});

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/expenses', expenseRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
