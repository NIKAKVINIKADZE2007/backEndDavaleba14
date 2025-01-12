const { default: mongoose } = require('mongoose');

const expenseSchema = new mongoose.Schema({
  category: String,
  description: String,
  amount: Number,
  price: Number,
  user: { type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] },
});

module.exports = mongoose.model('expense', expenseSchema);
