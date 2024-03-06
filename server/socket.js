// socket.js
const User = require("./Models/userModel");

const { Server } = require("socket.io");

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Function to update users from the database
    const updateUsersFromDatabase = async () => {
        try {
            const usersFromDB = await User.find(); // Assuming you have a method to fetch all users
            const users = usersFromDB.map(user => ({ id: user.email, name: user.firstname }));
            io.emit('userUpdate', users);
        } catch (error) {
            console.error('Error fetching users from database:', error);
        }
    };

    io.on("connection", (socket) => {
        console.log("A user connected");

        // Fetch users from the database and send to the newly connected user
        updateUsersFromDatabase();

        // Other connection handling code...

        socket.on('disconnect', () => {
            console.log('A user disconnected');
            // Update the user list and broadcast to all clients
            updateUsersFromDatabase();
        });

        socket.on('sendMessage', (data) => {
            console.log('Received message from client:', data);
            // Broadcast the message to all connected clients
            io.emit('message', data);
        });
    });
};

module.exports = initializeSocket;
