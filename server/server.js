const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();
const studentRoutes = require('../server/Routes/studentRoutes');
const teacherRoutes = require('../server/Routes/teacherRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use("/student/register", studentRoutes);
app.use("/teacher/register", teacherRoutes);

app.use("/student/login", studentRoutes);
app.use("/teacher/login", teacherRoutes);





app.listen(PORT, () => {
    console.log('\x1b[44m\x1b[33m%s\x1b[0m', `Server is running on port ${PORT}`);
});
