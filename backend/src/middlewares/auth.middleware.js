const { verify } = require("../utils/jwt");

async function authMiddleware(req, res, next) {
  try {
    let token = null;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "No token provided" });

    const payload = verify(token);

    req.user = { id: payload.id, email: payload.email };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
