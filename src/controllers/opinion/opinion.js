const Opinion = require("../../models/opinions/opinion.model");

exports.createOpinion = async (req, res) => {
  try {
   console.log(req.body); // Debugging line to check the request body

    const { title, direction, description, rating } = req.body;

    if (!title || !direction || !description || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOpinion = new Opinion({
      title,
      direction,
      description,
      rating,
    });

    await newOpinion.save();
    res.status(201).json({ message: "Opinion created successfully", opinion: newOpinion });
  } catch (error) {
    console.error("Error creating opinion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.getOpinions = async (req, res) => {
  try {
    const opinions = await Opinion.find().sort({ createdAt: -1 });
    res.status(200).json(opinions);
  } catch (error) {
    console.error("Error fetching opinions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.getOpinionById = async (req, res) => {
  try {
    const opinionId = req.params.id;
    const opinion = await Opinion.findById(opinionId);

    if (!opinion) {
      return res.status(404).json({ message: "Opinion not found" });
    }

    res.status(200).json(opinion);
  } catch (error) {
    console.error("Error fetching opinion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.updateOpinion = async (req, res) => {
  try {
    const opinionId = req.params.id;
    const { title, direction, text, rating } = req.body;

    if (!title || !direction || !text || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedOpinion = await Opinion.findByIdAndUpdate(
      opinionId,
      { title, direction, text, rating },
      { new: true }
    );

    if (!updatedOpinion) {
      return res.status(404).json({ message: "Opinion not found" });
    }

    res.status(200).json({ message: "Opinion updated successfully", opinion: updatedOpinion });
  } catch (error) {
    console.error("Error updating opinion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.deleteOpinion = async (req, res) => {
  try {
    const opinionId = req.params.id;
    const deletedOpinion = await Opinion.findByIdAndDelete(opinionId);

    if (!deletedOpinion) {
      return res.status(404).json({ message: "Opinion not found" });
    }

    res.status(200).json({ message: "Opinion deleted successfully" });
  } catch (error) {
    console.error("Error deleting opinion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.getOpinionsByDirection = async (req, res) => {
  try {
    const direction = req.params.direction;
    const opinions = await Opinion.find({ direction }).sort({ createdAt: -1 });

    if (opinions.length === 0) {
      return res.status(404).json({ message: "No opinions found for this direction" });
    }

    res.status(200).json(opinions);
  } catch (error) {
    console.error("Error fetching opinions by direction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getOpinionsByRating = async (req, res) => {
  try {
    const rating = parseInt(req.params.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
    }

    const opinions = await Opinion.find({ rating }).sort({ createdAt: -1 });

    if (opinions.length === 0) {
      return res.status(404).json({ message: "No opinions found with this rating" });
    }

    res.status(200).json(opinions);
  } catch (error) {
    console.error("Error fetching opinions by rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

