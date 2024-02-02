  const express = require("express");
  const router = express.Router();
  const {
    alumniRegController,
    alumniLoginController
  } = require("../Controllers/alumniController");
  const alumniJobShareController = require("../Controllers/alumniJobShareController")
  const AuthMiddleware = require("../Middleware/AuthMiddleware");

  //REGISTER || Alumni

  router.post("/register", async (req, res) => {
    try {
      await alumniRegController(req, res);
    } catch (error) {
      console.error("Error in /signup route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // POST || Job

  router.post("/job-share" ,async (req,res) =>{
      try {
          await alumniJobShareController.jobShare(req, res);
      } catch (error) {
          console.error("Error in /JobSharing route:", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
  });

  // GET || Job Details

  router.get("/get-job", async (req, res)=>{
    try {
      await alumniJobShareController.getJob(req, res);
    } catch (error) {
      console.error("Error in /JobSharing route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  // POST || Update Job Status

router.post('/update-job-status', async (req, res) => {
  try {
    await alumniJobShareController.updateJobStatus(req, res);
  } catch (error) {
    console.error('Error in /update-job-status route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  module.exports = router;
