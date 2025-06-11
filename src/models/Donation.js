const db = require("../config/db");

class Donation {
  static getDonations(callback) {
    const query = `
      SELECT 
        donation_id,
        user_id,
        title,
        description,
        quantity_value,
        quantity_unit,
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
        quantity_value,
        quantity_unit,
        expiry_date,
        location,
        donation_status,
        donation_picture,
        created_at
      FROM donations
      WHERE donation_id = ?
    `;
    db.query(query, [donation_id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      return callback(null, results[0]);
    });
  }

  static CreateDonation(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    for (let key in data) {
      fields.push(key);
      values.push("?");
      params.push(data[key]);
    }

    const query = `INSERT INTO donations (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;
    db.query(query, params, (err, result) => {
      if (err) return callback(err, null);
      const newData = { donation_id: result.insertId, ...data };
      return callback(null, newData);
    });
  }

  static updateDonation(donation_id, data, callback) {
    const updates = [];
    const params = [];

    for (let key in data) {
      updates.push(`${key} = ?`);
      params.push(data[key]);
    }

    params.push(donation_id);
    const query = `UPDATE donations SET ${updates.join(
      ", "
    )} WHERE donation_id = ?`;

    db.query(query, params, (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  }
}

module.exports = Donation;
