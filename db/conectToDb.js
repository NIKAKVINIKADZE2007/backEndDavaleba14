const { default: mongoose } = require('mongoose');
require('dotenv').config();
module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected to data base');
  } catch (e) {
    console.log(e, 'error coudnt conect');
  }
};
