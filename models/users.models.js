
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {type: String, enum: ['regular', 'creator'], required: true }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
