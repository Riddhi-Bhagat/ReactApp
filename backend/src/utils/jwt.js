const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secret123';

function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

function verify(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { sign, verify };
