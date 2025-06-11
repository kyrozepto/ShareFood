const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const requestController = require("../controllers/requestController");
const multer = require("multer");

const upload = multer();

router.get("/", requestController.getRequests);
router.get("/:id", requestController.getRequestById);
router.post(
  "/",
  authenticateToken,
  upload.none(),
  requestController.createRequest
),
  router.put(
    "/:id",
    authenticateToken,
    upload.none(),
    requestController.updateRequest
  );

module.exports = router;
