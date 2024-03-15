import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  Grid,
  Paper,
  List,
  ListItem,
  TextField,
  Button,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useAuth } from "../../Context/AuthContext"; // Import your authentication context

const socket = io("http://localhost:5000", {
  transport: ["websocket"],
});

function ChatComponent() {
  const { auth } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchInitialMessages();

    socket.on("userUpdate", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        return updatedMessages;
      });
    });

    return () => {
      socket.off("userUpdate");
      socket.off("message");
    };
  }, []);

  const fetchInitialMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/messages"); // Replace with your actual API endpoint
      const initialMessages = await response.json();
      
      setMessages(initialMessages);
    } catch (error) {
      console.error(
        "Error fetching initial messages from the database:",
        error
      );
    }
  };

  const fetchInitialUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const initialUsers = await response.json();
      setUsers(initialUsers.name);
    } catch (error) {
      console.error("Error fetching initial users:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      const { name, email, role } = auth;
      socket.emit("sendMessage", { name, email, message, role });
      setMessage("");
      console.log("Mundalil")
    }
  };

  const isOwnMessage = (userEmail) => {
    return userEmail === auth.email;
  };

  return (
    <div style={{ display: "flex", maxHeight: "100vh" }}>
      <Grid container>
        {/* <Grid item style={{ width: "80px", maxHeight: "100vh" }}>
          <div
            className="bg-primary"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button>Icon 1</Button>
            <Button>Icon 2</Button>
            <Button>Icon 3</Button>
          </div>
        </Grid> */}

        <Grid item xs={4} style={{ height: "90vh" }}>
          <Paper
            style={{
              height: "100%",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
            }}
          >
            <List style={{ marginLeft: "0px" }}>
              {users.map((user) => (
                <ListItem
                  key={user.id}
                  style={{
                    borderBottom: "0.1px solid blue",
                    paddingLeft: "30px",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  {user.name}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid
          item
          style={{
            maxHeight: "100%",
            overflowY: "auto",
            flexGrow: 1,
          }}
        >
          <Grid container spacing={2} style={{ height: "100%" }}>
            <Grid item xs={12}>
              <Paper style={{ height: "80vh", overflowY: "auto" }}>
                <div>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {messages.map((message, index) => (
                        message.name && message.message && (
                      <li
                        key={index}
                        style={{
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: isOwnMessage(message.email)
                            ? "flex-end"
                            : "flex-start",
                        }}
                      >
                        {!isOwnMessage(message.email) && message.name && (
                          <Avatar style={{ marginRight: "10px" }}>
                            {message.name.charAt(0).toUpperCase()}
                          </Avatar>
                        )}
                        <Paper
                          elevation={3}
                          style={{
                            padding: "10px",
                            backgroundColor: isOwnMessage(message.email)
                              ? "#2979FF"
                              : "#E0E0E0",
                            borderRadius: "10px",
                            maxWidth: "70%",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              <strong>{message.name}</strong>: {message.message}
                            </div>
                          </div>
                        </Paper>
                      </li>
                   ) ))}
                  </ul>
                </div>
              </Paper>
              <div style={{ width: "" }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} alignItems="center" style={{}}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        type="text"
                        label="Your message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <Button type="submit" variant="contained" color="primary">
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatComponent;
