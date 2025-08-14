const {
  createOpinion,
  getOpinions,
  getOpinionById,
  updateOpinion,
  deleteOpinion,
  getOpinionsByDirection,
  getOpinionsByRating
} = require("../controllers/opinion/opinion")

const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/", authMiddleware, createOpinion);
router.get("/", getOpinions);
router.get("/:id", getOpinionById);
router.put("/:id", authMiddleware, updateOpinion);
router.delete("/:id", authMiddleware, deleteOpinion);
router.get("/direction/:direction", getOpinionsByDirection);
router.get("/rating/:rating", getOpinionsByRating);

module.exports = router;
