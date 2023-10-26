// server/Models/departmentModel.js

const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  departmentId: String,
});

module.exports = mongoose.model("Department", departmentSchema);
