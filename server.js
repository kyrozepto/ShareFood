// server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Example route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const donationRoutes = require("./src/routes/donationRoutes");
const requestRoutes = require("./src/routes/requestRoutes");
const ratingRoutes = require("./src/routes/ratingRoutes");

// Use Routes
app.use("/api/user", userRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/rating", ratingRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

// Docs
const setupSwagger = require("./src/docs/swagger");
setupSwagger(app);
