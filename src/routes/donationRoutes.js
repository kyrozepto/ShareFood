const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const donationController = require("../controllers/donationController");
const multer = require("multer");

const upload = multer();

router.get("/", donationController.getDonations);
router.get("/:id", donationController.getDonationById);
router.post(
  "/",
  authenticateToken,
  upload.single("donation_picture"),
  donationController.createDonation
),
  router.put(
    "/:id",
    authenticateToken,
    upload.none(),
    donationController.updateDonation
  );

module.exports = router;
