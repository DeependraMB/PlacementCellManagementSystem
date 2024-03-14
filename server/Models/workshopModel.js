// models/workshop.js

const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    workshop_title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    facilitator: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    virtual_platform: {
      // Assuming a simple structure, adjust as needed
      link: String,
      meetingId: String,
    },
    poster: {
      type: String
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "workshopCollection",
  }
);

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
