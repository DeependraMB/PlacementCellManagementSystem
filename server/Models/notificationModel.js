const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  recipientEmail: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  senderName: { type: String },
  link: { type: String },
  metadata: { type: Object },
  attachments: [
    {
      fileName: { type: String },
      fileType: { type: String },
      fileUrl: { type: String },
    },
  ],
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
