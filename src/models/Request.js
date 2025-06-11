const db = require("../config/db");

class Request {
  static getRequests(callback) {
    const query = `SELECT * FROM requests`;
    db.query(query, callback);
  }

  static getRequestById(request_id, callback) {
    const query = `SELECT * FROM requests WHERE request_id = ?`;
    db.query(query, [request_id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      return callback(null, results[0]);
    });
  }

  static CreateRequest(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    for (let key in data) {
      fields.push(key);
      values.push("?");
      params.push(data[key]);
    }

    const query = `INSERT INTO requests (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;
    db.query(query, params, (err, result) => {
      if (err) return callback(err, null);
      const newData = { request_id: result.insertId, ...data };
      return callback(null, newData);
    });
  }

  static updateRequest(request_id, data, callback) {
    const updates = [];
    const params = [];

    for (let key in data) {
      updates.push(`${key} = ?`);
      params.push(data[key]);
    }

    params.push(request_id);
    const query = `UPDATE requests SET ${updates.join(
      ", "
    )} WHERE request_id = ?`;
    db.query(query, params, (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  }
}

module.exports = Request;
