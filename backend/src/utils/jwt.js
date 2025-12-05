const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'please_change_this_secret';

function sign(payload, expiresIn='1h') {
  return jwt.sign(payload, SECRET, { algorithm: 'HS256', expiresIn });
}

function verify(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { sign, verify };
