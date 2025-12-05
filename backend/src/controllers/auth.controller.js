const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.logout = async (req, res) => {
  try {
    // Frontend se token clear hoga
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
