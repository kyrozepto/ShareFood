const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const ratingController = require("../controllers/ratingController");
const multer = require("multer");

const upload = multer();

router.get("/", ratingController.getRatings);
router.get("/:id", ratingController.getRatingById);
router.post(
  "/",
  authenticateToken,
  upload.none(),
  ratingController.createRating
);

module.exports = router;
