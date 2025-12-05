const { User } = require("../../models");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    await User.update(
      { name, phone },
      { where: { id: req.user.id } }
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
