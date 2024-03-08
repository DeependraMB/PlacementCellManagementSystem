const mongoose = require("mongoose");

// Create a Message schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

// Create a Message model
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
