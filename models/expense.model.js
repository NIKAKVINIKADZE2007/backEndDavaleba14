const { default: mongoose } = require('mongoose');

const expenseSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: { type: String, lowercase: true },
  password: String,
  user: { type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] },
});

module.exports = mongoose.model('expense', expenseSchema);
