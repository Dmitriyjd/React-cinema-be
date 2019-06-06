const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  first_name: 'string',
  last_name: 'string',
  email: 'string',
  password: 'string',
});

const User = mongoose.model('User', schema);

async function createUser(userData) {
  try {
    return await User.create(userData);
  } catch (error) {
    return error;
  }
}

async function getUserByEmail(email) {
  try {
    return await User.findOne({ email });
  } catch (error) {
    return error;
  }
}

module.exports = { createUser, getUserByEmail };
