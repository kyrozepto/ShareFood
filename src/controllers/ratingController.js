const Rating = require("../models/Rating");
const db = require("../config/db");

async function getRatings(req, res) {
  try {
    Rating.getRatings((err, results) => {
      if (err) {
        res.status(500).json({ message: "Error fetching data", error: err });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRatingById(req, res) {
  try {
    const { id } = req.params;

    Rating.getRatingById(id, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching user", error: err });
      }
      if (!user) {
        return res.status(404).json({ message: "Request not found" });
      }
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createRating(req, res) {
  try {
    const { donation_id, rate, review } = req.body;
    const user_id = req.user.user_id;

    if (!donation_id || donation_id.length > 255) {
      return res.status(400).json({
        message: "ID donasi harus diisi dan maksimal 255 karakter",
      });
    }

    // Check if donation exists and is completed
    const donationIsCompleted = await new Promise((resolve, reject) => {
      const query = `
          SELECT donation_status 
          FROM donations 
          WHERE donation_id = ?
        `;
      db.query(query, [donation_id], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0].donation_status === "completed");
      });
    });

    if (donationIsCompleted === null) {
      return res.status(400).json({ message: "Donasi tidak ditemukan." });
    }

    if (!donationIsCompleted) {
      return res.status(400).json({
        message: "Rating hanya dapat diberikan jika donasi telah selesai.",
      });
    }

    const numericRate = Number(rate);
    if (isNaN(numericRate) || numericRate < 1 || numericRate > 5) {
      return res
        .status(400)
        .json({ message: "Rate harus berupa angka dari 1 sampai 5." });
    }

    if (review && review.length > 1000) {
      return res.status(400).json({
        message: "Review maksimal 1000 karakter",
      });
    }

    const ratingData = {
      user_id,
      donation_id,
      rate,
      review,
    };

    Rating.CreateRating(ratingData, (err, newRating) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal membuat rating",
          error: err,
        });
      }
      res.status(201).json(newRating);
    });
  } catch (error) {
    console.error("Create rating error:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat rating",
      error: error.message,
    });
  }
}

module.exports = {
  getRatings,
  getRatingById,
  createRating,
};
