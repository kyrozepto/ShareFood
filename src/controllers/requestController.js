const Request = require("../models/Request");
const Donation = require("../models/Donation");
const db = require("../config/db");

async function getRequests(req, res) {
  try {
    Request.getRequests((err, results) => {
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

async function getRequestById(req, res) {
  try {
    const { id } = req.params;

    Request.getRequestById(id, (err, user) => {
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

async function createRequest(req, res) {
  try {
    const { donation_id, requested_quantity, pickup_time, note } = req.body;
    const user_id = req.user.user_id;

    // Validation
    if (!donation_id || donation_id.length > 255) {
      return res.status(400).json({
        message: "ID donasi harus diisi dan maksimal 255 karakter",
      });
    }

    const donationExists = await new Promise((resolve, reject) => {
      const query = "SELECT 1 FROM donations WHERE donation_id = ?";
      db.query(query, [donation_id], (err, results) => {
        if (err) return reject(err);
        resolve(results.length > 0);
      });
    });

    if (!donationExists) {
      return res.status(400).json({
        message: "Donasi tidak ditemukan. Pastikan ID donasi valid.",
      });
    }

    if (!requested_quantity || requested_quantity.length > 100) {
      return res.status(400).json({
        message: "Jumlah permintaan harus diisi dan maksimal 100 karakter",
      });
    }

    if (!pickup_time) {
      return res.status(400).json({ message: "Waktu pengambilan harus diisi" });
    }

    if (!note || note.length > 1000) {
      return res.status(400).json({
        message: "Catatan harus diisi dan maksimal 1000 karakter",
      });
    }

    const requestData = {
      user_id,
      donation_id,
      requested_quantity,
      pickup_time,
      note,
    };

    Request.CreateRequest(requestData, (err, newRequest) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal membuat request",
          error: err,
        });
      }
      res.status(201).json(newRequest);
    });
  } catch (error) {
    console.error("Create request error:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat request",
      error: error.message,
    });
  }
}

async function updateRequest(req, res) {
  try {
    const { id } = req.params;
    const { request_status } = req.body;

    if (!request_status)
      return res.status(400).json({ message: "request_status harus diisi" });

    Request.getRequestById(id, async (err, request) => {
      if (err || !request)
        return res.status(404).json({ message: "Request tidak ditemukan" });

      if (request_status === "completed") {
        const [valueStr] = request.requested_quantity.split(" ");
        const value = parseFloat(valueStr);

        if (isNaN(value)) {
          return res
            .status(400)
            .json({ message: "Format requested_quantity tidak valid" });
        }

        Donation.getDonationById(request.donation_id, (err, donation) => {
          if (err || !donation) {
            return res.status(404).json({ message: "Donasi tidak ditemukan" });
          }

          let newQty = parseFloat(donation.quantity_value) - value;
          if (newQty < 0) newQty = 0;

          Donation.updateDonation(
            request.donation_id,
            { quantity_value: newQty },
            (err) => {
              if (err)
                return res
                  .status(500)
                  .json({ message: "Gagal mengurangi jumlah donasi" });

              Request.updateRequest(id, { request_status }, (err) => {
                if (err)
                  return res
                    .status(500)
                    .json({ message: "Gagal mengupdate request" });
                res.status(200).json({
                  message: "Request diselesaikan dan donasi dikurangi",
                });
              });
            }
          );
        });
      } else {
        Request.updateRequest(id, { request_status }, (err) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Gagal mengupdate request" });
          res.status(200).json({ message: "Status request diperbarui" });
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
};
