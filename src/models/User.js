const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  static getUsers(callback) {
    const query = `
      SELECT 
        user_id,
        user_name,
        password,
        user_type,
        phone,
        email,
        created_at,
        profile_picture
      FROM users
    `;

    db.query(query, callback);
  }

  static getUserById(user_id, callback) {
    const query = `
      SELECT 
        user_id,
        user_name,
        password,
        user_type,
        phone,
        email,
        created_at,
        profile_picture
      FROM users
      WHERE user_id = ?
    `;
    db.query(query, [user_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      return callback(null, results[0]);
    });
  }

  static CreateUser(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    if (data.user_name) {
      fields.push("user_name");
      values.push("?");
      params.push(data.user_name);
    }

    if (data.password) {
      fields.push("password");
      values.push("?");
      params.push(bcrypt.hashSync(data.password, 10));
    }

    if (data.user_type) {
      fields.push("user_type");
      values.push("?");
      params.push(data.user_type);
    }

    if (data.phone) {
      fields.push("phone");
      values.push("?");
      params.push(data.phone);
    }

    if (data.email) {
      fields.push("email");
      values.push("?");
      params.push(data.email);
    }

    const query = `INSERT INTO users (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const newData = { user_id: result.insertId, ...data };
      return callback(null, newData);
    });
    console.log("Data: ", data);
  }

  static updateUser(user_id, data, callback) {
    const fields = [];
    const params = [];

    if (data.user_name) {
      fields.push("user_name = ?");
      params.push(data.user_name);
    }

    if (data.password) {
      fields.push("password = ?");
      params.push(bcrypt.hashSync(data.password, 10));
    }

    if (data.user_type) {
      fields.push("user_type = ?");
      params.push(data.user_type);
    }

    if (data.phone) {
      fields.push("phone = ?");
      params.push(data.phone);
    }

    if (data.email) {
      fields.push("email = ?");
      params.push(data.email);
    }

    if (data.profile_picture) {
      fields.push("profile_picture = ?");
      params.push(data.profile_picture);
    }

    if (fields.length === 0) {
      return callback(new Error("No valid fields provided for update"), null);
    }

    const query = `UPDATE users SET ${fields.join(", ")} WHERE user_id = ?`;
    params.push(user_id);

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  static login(email, password, callback) {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, { success: false, message: "User not found" });
      }

      console.log("Password: ", password);

      const user = results[0];
      console.log("Stored hash from DB:", user.password);
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return callback(null, { success: false, message: "Invalid password" });
      }

      console.log("Hash Password: ", isPasswordValid);

      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.user_id, email: user.email },
        process.env.JWT_SECRET || "05052025", // Use env var or fallback
        { expiresIn: "5h" }
      );
      console.log("Token:", token);

      return callback(null, { success: true, user, token });
    });
  }
}

module.exports = User;
