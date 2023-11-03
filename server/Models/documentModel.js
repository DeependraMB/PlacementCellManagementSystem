const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: String,
  description: String,
  name: String,
  email: String,
  filepath: String, // This should be the path to the uploaded file
  createdAt: { type: Date, default: Date.now } // Add a createdAt field with the current date and time as the default value
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
