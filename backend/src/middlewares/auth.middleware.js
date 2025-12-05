const { verify } = require('../utils/jwt');

async function authMiddleware(req, res, next) {
  try {
    let token = null;
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer ')) token = auth.split(' ')[1];
    if (!token && req.cookies && req.cookies.token) token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Authorization required' });
    const payload = verify(token);
    req.user = { id: payload.user_id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
