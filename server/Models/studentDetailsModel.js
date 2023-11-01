

const mongoose = require("mongoose");

// Create a schema for your data
const PersonalSchema = new mongoose.Schema({
  
  dob: {
    type: String,
    
  },
  personalemail: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  fathername: {
    type: String,
    
  },
  mothername: {
    type: String,
    
  },
  housename: {
    type: String,
    
  },
  postoffice: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  state: {
    type: String,
    
  },
  pincode: {
    type: String,
    
  },
  nationality: {
    type: String,
    
  },
});

const Personal = mongoose.model("Personal", PersonalSchema);

module.exports = Personal