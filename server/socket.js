// socket.js
const User = require("./Models/userModel");
const Message = require("./Models/messageModel");

const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const updateUsersAndMessages = async (socket) => {
    try {
      const usersFromDB = await User.find();
      const users = usersFromDB.map((user) => ({
        id: user.email,
        name: user.firstname,
      }));

      const allMessages = await Message.find().sort({ timestamp: 1 });

      io.emit("userUpdate", users);
      io.to(socket.id).emit("message", allMessages);
    } catch (error) {
      console.error("Error fetching users or messages from the database:", error);
    }
  };

  io.on("connection", (socket) => {
    console.log("user connected", `${socket.id}`);

    updateUsersAndMessages(socket);

    socket.on("disconnect", () => {
      console.log("user disconnected");

    //   updateUsersAndMessages(socket);
    });

    socket.on("sendMessage", async (data) => {
      console.log("Received message from client:", data);

      const { name, email, role, message } = data;

      const newMessage = new Message({ name, email, role, message });

      try {
        await newMessage.save();
        console.log("Message saved to MongoDB:", newMessage);
      } catch (error) {
        console.error("Error saving message to MongoDB:", error);
      }

      io.emit("message", newMessage);
      console.log("Message Emitted!")
    });
  });
};

module.exports = initializeSocket;
