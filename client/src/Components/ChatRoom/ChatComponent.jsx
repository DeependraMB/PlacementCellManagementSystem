// ChatComponent.js

import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { Container, Grid, Paper, List, ListItem, TextField, Button } from '@mui/material';
import { useAuth } from "../../Context/AuthContext";


const socket = io('http://localhost:5000', {
    transport: ['websocket'],
});

function ChatComponent() {
    //const [name, setName] = useState('');
  const { auth, setAuth } = useAuth();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    console.log(auth);
    
    useEffect(() => {
        // Listen for user updates
        socket.on('userUpdate', (updatedUsers) => {
            setUsers(updatedUsers);
        });

        // Listen for messages
        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
    }, []);

    

    const handleSubmit = (event) => {
      event.preventDefault();
      if (message.trim() !== '') {
          const { role, email, name } = auth;
          socket.emit('sendMessage', { name, email, message, role });
          setMessage('');
      }
  };
  

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper>
                        <List>
                            {users.map((user) => (
                                <ListItem key={user.id}>{user.name}</ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    type="text"
                                    label="Your message"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Send
                                </Button>
                            </form>
                        </div>
                        <div>
                            <ul>
                                {messages.map((message, index) => (
                                    <li key={index}>
                                        {message.name}: {message.message} {/* Display firstname */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ChatComponent;
