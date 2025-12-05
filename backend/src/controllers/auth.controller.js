const bcrypt = require("bcryptjs");
const { sign } = require("../utils/jwt");
const { User } = require("../../models");

// =================== LOGIN ===================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = sign({ id: user.id, email: user.email });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// =================== LOGOUT ===================
exports.logout = async (req, res) => {
  try {
    

    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
