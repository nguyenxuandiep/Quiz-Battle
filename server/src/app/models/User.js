const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  avatar_url: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', User)