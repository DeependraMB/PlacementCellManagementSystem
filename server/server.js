const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();
const loginRoutes = require("../server/Routes/loginRoutes");
const studentRoutes = require("./Routes/studentRoutes");
const teacherRoutes = require("./Routes/teacherRoutes");
const resetpasswordRoutes = require("./Routes/resetpasswordRoutes");
const verifyEmailRoutes = require("../server/Routes/verifyEmailRoutes");
const User = require("./Models/userModel");
const Department = require("./Models/departmentModel")
const departmentRouter = require("./Routes/departmentRouter");
const studentDetailsRoutes = require("./Routes/studentDetailsRoutes");

const otpStore = {};

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routers
app.use("/student/register", studentRoutes);

app.use("/teacher/register", teacherRoutes);

app.use("/user/login", loginRoutes);

app.use("/user/reset-password", resetpasswordRoutes);

app.use("/verify-email", verifyEmailRoutes);

app.get("/get-students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-teachers", async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-student-byid/:id", async (req, res) => {
  const studentId = req.params.id;
  
  try {
    const student = await User.findById(studentId);

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/get-department-name/:departmentId', async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    
    const department = await Department.findOne({departmentId});
    
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    res.json({ departmentName: department.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.use("/departments", departmentRouter);

app.use("/studentDetails", studentDetailsRoutes);

app.listen(PORT, () => {
  console.log("\x1b[44m\x1b[33m%s\x1b[0m", `Server is running on port ${PORT}`);
});
