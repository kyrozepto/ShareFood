const db = require("../config/db");

class Donation {
  static getDonations(callback) {
    const query = `
        SELECT 
          donation_id,
          user_id,
          title,
          description,
          quantity,
          expiry_date,
          location,
          donation_status,
          donation_picture,
          created_at
        FROM donations
      `;

    db.query(query, callback);
  }

  static getDonationById(donation_id, callback) {
    const query = `
           SELECT 
          donation_id,
          user_id,
          title,
          description,
          quantity,
          expiry_date,
          location,
          donation_status,
          donation_picture,
          created_at
        FROM donations
        WHERE donation_id = ?
      `;
    db.query(query, [donation_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      return callback(null, results[0]);
    });
  }

  static CreateDonation(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    if (data.title) {
      fields.push("title");
      values.push("?");
      params.push(data.title);
    }

    if (data.description) {
      fields.push("description");
      values.push("?");
      params.push(data.description);
    }

    if (data.location) {
      fields.push("location");
      values.push("?");
      params.push(data.location);
    }

    if (data.quantity) {
      fields.push("quantity");
      values.push("?");
      params.push(data.quantity);
    }

    if (data.expiry_date) {
      fields.push("expiry_date");
      values.push("?");
      params.push(data.expiry_date);
    }

    if (data.user_id) {
      fields.push("user_id");
      values.push("?");
      params.push(data.user_id);
    }

    if (data.donation_picture) {
      fields.push("donation_picture");
      values.push("?");
      params.push(data.donation_picture);
    }

    const query = `INSERT INTO donations (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const newData = { donation_id: result.insertId, ...data };
      return callback(null, newData);
    });

    console.log("Donation Data: ", data);
  }

  static updateDonation(donation_id, data, callback) {
    if (!data.donation_status) {
      return callback(new Error("donation_status harus diisi"), null);
    }

    const query = `UPDATE donations SET donation_status = ? WHERE donation_id = ?`;
    const params = [data.donation_status, donation_id];

    db.query(query, params, (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  }
}

module.exports = Donation;
