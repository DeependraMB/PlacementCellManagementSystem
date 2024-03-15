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
    const { filename } = req.params;

    const filePath = path.join(__dirname, "../uploads", filename);

    res.sendFile(filePath);
  } catch (error) {
    console.error("Error in getPoster controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addParticipant = async (req, res) => {
  try {
    const { workshopId, name, email } = req.body;

    const workshop = await Workshop.findById(workshopId);

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    workshop.participants.push({ name, email });

    const updatedWorkshop = await workshop.save();

    res.status(200).json({ message: 'Participant added successfully', workshop: updatedWorkshop });
  } catch (error) {
    console.error('Error adding participant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
