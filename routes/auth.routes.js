const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password length must be greater than 8").isLength({
      min: 6,
    }),
  ],
  async (req, resp) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.status(400).json({
          errors: errors.array(),
          message: "Registration data invalid",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return resp.status(400).json({ message: "User already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 17);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      return resp
      .status(201)
      .json({ message: "User created successfully" });
    } catch (e) {
      return resp
        .status(500)
        .json({ message: "Internal server error" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter valid email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, resp) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return resp.status(400).json({
          errors: errors.array(),
          message: "Authentication data invalid",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return resp.status(400).json({ message: "Пользователь не найден" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return resp
          .status(400)
          .json({ message: "Invalid password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expirespIn: "1h",
      });

      return resp.json({ token, userId: user.id });
    } catch (e) {
      return resp
        .status(500)
        .json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
