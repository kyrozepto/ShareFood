const Donation = require("../models/Donation");
const { imageUpload } = require("../utils/ImageKit.js");

async function getDonations(req, res) {
  try {
    Donation.getDonations((err, results) => {
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

async function getDonationById(req, res) {
  try {
    const { id } = req.params;

    Donation.getDonationById(id, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching user", error: err });
      }
      if (!user) {
        return res.status(404).json({ message: "Donation not found" });
      }
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createDonation(req, res) {
  try {
    const { title, description, location, quantity, expiry_date } = req.body;
    const user_id = req.user.user_id;

    let photoUrl = null;
    if (req.file) {
      photoUrl = await imageUpload(req.file);
    }

    // Validation
    if (!title || title.length > 255) {
      return res.status(400).json({
        message: "Judul donasi harus diisi dan maksimal 255 karakter",
      });
    }

    if (!description || description.length > 1000) {
      return res.status(400).json({
        message: "Deskripsi harus diisi dan maksimal 1000 karakter",
      });
    }

    if (!location) {
      return res.status(400).json({ message: "Lokasi harus diisi" });
    }

    if (!quantity || quantity.length > 100) {
      return res.status(400).json({
        message: "Jumlah harus diisi dan maksimal 100 karakter",
      });
    }

    if (!expiry_date) {
      return res.status(400).json({
        message: "Tanggal kadaluarsa harus diisi",
      });
    }

    const today = new Date();
    const expiry = new Date(expiry_date);

    // Clear time to compare dates only
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    if (expiry < today) {
      return res.status(400).json({
        message: "Tanggal kadaluarsa tidak boleh sebelum hari ini",
      });
    }

    const donationData = {
      user_id,
      title,
      description,
      location,
      quantity,
      expiry_date,
    };

    if (photoUrl) {
      donationData.donation_picture = photoUrl;
    }

    Donation.CreateDonation(donationData, (err, newDonation) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal membuat donasi",
          error: err,
        });
      }
      res.status(201).json(newDonation);
    });
  } catch (error) {
    console.error("Create donation error:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat donasi",
      error: error.message,
    });
  }
}

async function updateDonation(req, res) {
  try {
    const { id } = req.params;
    const { donation_status } = req.body;

    if (!donation_status) {
      return res.status(400).json({ message: "donation_status harus diisi" });
    }

    Donation.updateDonation(id, { donation_status }, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal mengupdate status donasi",
          error: err,
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Donasi tidak ditemukan" });
      }
      res.status(200).json({ message: "Status donasi berhasil diupdate" });
    });
  } catch (error) {
    console.error("Update donation error:", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getDonations,
  getDonationById,
  createDonation,
  updateDonation,
};
