const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../database/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await db.read();

    const existingUser = db.data.users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword
    };

    db.data.users.push(newUser);
    await db.write();

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      "mimo-secret-key",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    await db.read();

    const user = db.data.users.find(
      (u) => u.email === email
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "mimo-secret-key",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

