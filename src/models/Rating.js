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

    for (let key in data) {
      updates.push(`${key} = ?`);
      params.push(data[key]);
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
