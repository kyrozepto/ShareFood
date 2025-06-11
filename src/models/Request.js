const db = require("../config/db");

class Request {
  static getRequests(callback) {
    const query = `
          SELECT 
            donation_id,
            user_id,
            requested_quantity,
            pickup_time,
            note,
            request_status,
            created_at
          FROM Requests
        `;

    db.query(query, callback);
  }

  static getRequestById(request_id, callback) {
    const query = `
             SELECT 
            donation_id,
            user_id,
            requested_quantity,
            pickup_time,
            note,
            request_status,
            created_at
          FROM Requests
          WHERE request_id = ?
        `;
    db.query(query, [request_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      return callback(null, results[0]);
    });
  }

  static CreateRequest(data, callback) {
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

    if (data.requested_quantity) {
      fields.push("requested_quantity");
      values.push("?");
      params.push(data.requested_quantity);
    }

    if (data.pickup_time) {
      fields.push("pickup_time");
      values.push("?");
      params.push(data.pickup_time);
    }

    if (data.note) {
      fields.push("note");
      values.push("?");
      params.push(data.note);
    }

    const query = `INSERT INTO requests (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const newData = { request_id: result.insertId, ...data };
      return callback(null, newData);
    });

    console.log("Request Data: ", data);
  }

  static updateRequest(request_id, data, callback) {
    if (!data.request_status) {
      return callback(new Error("request_status harus diisi"), null);
    }

    const query = `UPDATE requests SET request_status = ? WHERE request_id = ?`;
    const params = [data.request_status, request_id];

    db.query(query, params, (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  }
}

module.exports = Request;
