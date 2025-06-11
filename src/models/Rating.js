const db = require("../config/db");

class Rating {
  static getRatings(callback) {
    const query = `
        SELECT 
          rating_id,
          donation_id,
          user_id,
          rate,
          review,
          created_at
        FROM ratings
      `;

    db.query(query, callback);
  }

  static getRatingById(rating_id, callback) {
    const query = `
           SELECT 
          rating_id,
          donation_id,
          user_id,
          rate,
          review,
          created_at
        FROM ratings
        WHERE rating_id = ?
      `;
    db.query(query, [rating_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      return callback(null, results[0]);
    });
  }

  static CreateRating(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    if (data.donation_id) {
      fields.push("donation_id");
      values.push("?");
      params.push(data.donation_id);
    }

    if (data.user_id) {
      fields.push("user_id");
      values.push("?");
      params.push(data.user_id);
    }

    const numericRate = Number(data.rate);
    if (!isNaN(numericRate)) {
      fields.push("rate");
      values.push("?");
      params.push(numericRate);
    }

    if (data.review) {
      fields.push("review");
      values.push("?");
      params.push(data.review);
    }

    const query = `
      INSERT INTO ratings (${fields.join(", ")})
      VALUES (${values.join(", ")})
    `;

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const newData = { rating_id: result.insertId, ...data };
      return callback(null, newData);
    });
  }
}

module.exports = Rating;
