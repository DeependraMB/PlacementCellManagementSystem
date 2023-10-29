const express = require("express");
const router = express.Router();
const {
  studentRegController,
  studentLoginController,
} = require("../Controllers/studentController");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

//REGISTER || Student

router.post("/register", async (req, res) => {
  try {
    await studentRegController(req, res);
  } catch (error) {
    console.error("Error in /signup route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// LOGIN || Student

router.post("/login", AuthMiddleware, async (req, res) => {
  try {
    await studentLoginController(req, res);
  } catch (error) {
    console.error("Error in /signup route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-student-byid", async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await User.findById(studentId);

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
