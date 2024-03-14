const Workshop = require("../Models/workshopModel");
const path = require('path')


exports.addWorkshop = async (req, res) => {
  try {
    const {
      workshop_title,
      date,
      time,
      duration,
      type,
      facilitator,
      description,
      virtual_platform_link, 
    } = req.body;

    // Get the file path of the uploaded image
    const poster = req.file ? req.file.path : "";

    const newWorkshop = new Workshop({
      type,
      workshop_title,
      date,
      time,
      duration,
      facilitator,
      description,
      virtual_platform: {
        link: virtual_platform_link, 
      },
      poster,
    });

    await newWorkshop.save();

    res
      .status(201)
      .json({ success: true, message: "Workshop Details added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getWorkshop= async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.status(200).json({ success: true, data: workshops });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.getPoster = async (req, res) => {
  try {
    // Extract the filename from the route parameters
    const { filename } = req.params;

    // Construct the file path
    const filePath = path.join(__dirname, "../uploads", filename);

    // Send the file to the client
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error in getPoster controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
