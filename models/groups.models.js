const mongoose = require("mongoose");



const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    onlineUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number}
  });
  
  const Group = mongoose.model('Group', groupSchema);
  
  module.exports = Group