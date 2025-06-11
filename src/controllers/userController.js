const User = require("../models/User");
const { imageUpload } = require("../utils/ImageKit.js");

async function getUsers(req, res) {
  try {
    User.getUsers((err, results) => {
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

async function getUserById(req, res) {
  try {
    const { id } = req.params;

    User.getUserById(id, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching user", error: err });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createUser(req, res) {
  try {
    const { user_name, password, confirm_password, phone, email, user_type } =
      req.body;
    console.log("body: ", req);

    // Validation
    if (!user_name || user_name.length > 255) {
      return res.status(400).json({
        message: "Nama harus diisi dan maksimal 255 karakter",
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password harus diisi dan minimal 8 karakter",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        message: "Password dan konfirmasi password harus sama",
      });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]+$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password harus mengandung setidaknya satu huruf besar, satu angka, dan satu simbol",
      });
    }

    if (phone && phone.length > 20) {
      return res.status(400).json({
        message: "No. Handphone tidak boleh lebih dari 20 karakter",
      });
    }

    if (!email || email.length > 100) {
      return res.status(400).json({
        message: "Email harus diisi dan maksimal 100 karakter",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format email tidak valid" });
    }

    if (!user_type || (user_type !== "donor" && user_type !== "receiver")) {
      return res.status(400).json({
        message: "User type harus berupa 'donor' atau 'receiver'",
      });
    }

    const userData = {
      user_name,
      password,
      phone,
      email,
      user_type,
    };

    User.CreateUser(userData, (err, newUser) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating user", error: err });
      res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("error: ", error);
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { user_name, password, phone, email, user_type, profile_picture } =
      req.body;

    let photoUrl = null;
    if (req.file) {
      photoUrl = await imageUpload(req.file);
    }

    // Prepare updated data
    const updatedData = {
      user_name,
      password,
      phone,
      email,
      user_type,
    };

    if (password) {
      updatedData.password = password;
    }
    if (photoUrl) {
      updatedData.profile_picture = photoUrl;
    }

    User.updateUser(id, updatedData, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error updating user", error: err });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log("BODY:", req.body);

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password harus diisi" });
    }

    // Login
    User.login(email, password, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan saat login", error: err });
      }
      if (!result.success) {
        return res.status(401).json({ message: result.message });
      }
      res.status(200).json({
        message: "Login berhasil",
        user: result.user,
        token: result.token,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  loginUser,
};
