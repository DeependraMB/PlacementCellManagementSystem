const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const http = require('http');
const {Server} = require("socket.io");
const initializeSocket = require("./socket");
const Message = require("./Models/messageModel");

const app = express();
const PORT = process.env.PORT;
app.use(express.static("uploads"));

const server = http.createServer(app).listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


initializeSocket(server);
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on('disconnect', () => {
//       console.log('A user disconnected');
//   });

//   socket.on('sendMessage', (data) => {
//       console.log('Received message from client:', data);
//       // Broadcast the message to all connected clients
//       io.emit('message', data);
//   });
// });

const loginRoutes = require("../server/Routes/loginRoutes");
const studentRoutes = require("./Routes/studentRoutes");
const teacherRoutes = require("./Routes/teacherRoutes");
const alumniRoutes = require("./Routes/alumniRoute");
const resetpasswordRoutes = require("./Routes/resetpasswordRoutes");
const verifyEmailRoutes = require("../server/Routes/verifyEmailRoutes");
const User = require("./Models/userModel");
const Department = require("./Models/departmentModel");
const Document = require("./Models/documentModel");
const Personal = require("./Models/studentDetailsModel")
const departmentRouter = require("./Routes/departmentRouter");
const studentDetailsRoutes = require("./Routes/studentDetailsRoutes");
const getDetailsRoute = require("./Routes/getDetailsRoute")
const getUserDataRoutes = require("./Routes/getUserDataRoutes");
const generateUserDataPDF = require("./Routes/generateUserDataPDF")
const sendNotificationRoute = require("./Routes/sendNotificationRoute");
const changePasswordRoute = require("./Routes/changePasswordRoute")
const AuthMiddleware = require("./Middleware/AuthMiddleware")
const statusRoute = require("./Routes/statusRoute");
const chartsRoute = require("./Routes/chartsRoute");
const examRoute = require("./Routes/examRoute");
const resumeRoute = require("./Routes/resumeRoute");
const feedbackRoute = require("./Routes/feedbackRoute");

const otpStore = {};



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routers
app.use("/student/register", studentRoutes);
app.use("/teacher/register", teacherRoutes);
app.use("/alumni/register", alumniRoutes);

app.use("/user/login", loginRoutes);

app.use("/user/reset-password", resetpasswordRoutes);
app.use("/verify-email", verifyEmailRoutes);

app.use("/departments", departmentRouter);

app.use("/studentdetails", studentDetailsRoutes);

app.use("/get-students", getDetailsRoute);
app.use("/get-teachers", getDetailsRoute);
app.use("/get-teacher/:id",getDetailsRoute);
app.use("/get-teacher/:departmentId/:batch",getDetailsRoute);
app.use("/get-user-byid/:id",getDetailsRoute);
app.use("/get-user-by-email",getDetailsRoute);
app.use("/get-department-name/:departmentId",getDetailsRoute);
app.use("/get-education-details/:email" ,getDetailsRoute)
app.use("/get-skills-details/:email",getDetailsRoute)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/get-profile-photo/:filename", getDetailsRoute);

app.use("/send-notification", sendNotificationRoute, AuthMiddleware);

app.use("/teacher-change-password/:email",changePasswordRoute);

app.use("/placed-students", chartsRoute);

app.use("/exams", examRoute);

app.use("/feedback",feedbackRoute);

//AlumniRoutes

app.use("/alumni",alumniRoutes);

//StudentRoutes

app.use("/get-personal-details",getUserDataRoutes);
app.use("/get-education-details" ,getUserDataRoutes);
app.use("/get-skills-details" ,getUserDataRoutes);

app.use("/generate-userdata-pdf", generateUserDataPDF);

app.use("/update-student-status", statusRoute);

app.use("/resume-ats-checker", resumeRoute);



app.get('/api/messages', async (req, res) => {
  try {
    // Fetch all messages from MongoDB
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/notesshare/notesshare", upload.single("file"), (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const title = formData.title;
    const description = formData.description;
    const name = formData.author;
    const email = formData.email;
    const file = req.file.path;

    const newDocument = new Document({
      title: title,
      description: description,
      name: name,
      email: email,
      filepath: file,
    });
    newDocument.save();

    res.status(201).json({ message: "Document uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/get-pdfs", async (req, res) => {
  try {
    const documents = await Document.find(); // Fetch only specific fields

    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: "No documents found" });
    }

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/notes/download/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    console.log(document);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    
    // Assuming 'filepath' is a relative path to the 'uploads' directory
    const fullPath = `uploads/${document.filepath}`;
    
    res.download(fullPath, document.title);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// app.listen(PORT, () => {
//   console.log("\x1b[44m\x1b[33m%s\x1b[0m", `Server is running on port ${PORT}`);
// });
