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
    const {
      title,
      description,
      location,
      quantity_value,
      quantity_unit,
      expiry_date,
    } = req.body;
    const user_id = req.user.user_id;

    if (!title || title.length > 255)
      return res.status(400).json({ message: "Judul wajib diisi." });
    if (!description || description.length > 1000)
      return res.status(400).json({ message: "Deskripsi wajib diisi." });
    if (!location)
      return res.status(400).json({ message: "Lokasi wajib diisi." });
    if (!quantity_value || isNaN(quantity_value))
      return res.status(400).json({ message: "Jumlah wajib diisi." });
    if (!["kg", "g", "liter", "ml", "pcs"].includes(quantity_unit))
      return res.status(400).json({ message: "Satuan tidak valid." });
    if (!expiry_date)
      return res
        .status(400)
        .json({ message: "Tanggal kadaluarsa wajib diisi." });

    const photoUrl = req.file ? await imageUpload(req.file) : null;

    const donationData = {
      user_id,
      title,
      description,
      location,
      quantity_value,
      quantity_unit,
      expiry_date,
      donation_picture: photoUrl || null,
    };

    Donation.CreateDonation(donationData, (err, newDonation) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Gagal membuat donasi", error: err });
      res.status(201).json(newDonation);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
}

async function updateDonation(req, res) {
  try {
    const { id } = req.params;
    const { donation_status } = req.body;

    if (!donation_status)
      return res.status(400).json({ message: "donation_status wajib diisi" });

    Donation.getDonationById(id, (err, donation) => {
      if (err || !donation)
        return res.status(404).json({ message: "Donasi tidak ditemukan" });

      const statusToUpdate =
        donation.quantity_value === 0 ? "completed" : donation_status;

      Donation.updateDonation(
        id,
        { donation_status: statusToUpdate },
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Gagal update status", error: err });
          res.status(200).json({ message: "Status donasi diperbarui" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getDonations,
  getDonationById,
  createDonation,
  updateDonation,
};
