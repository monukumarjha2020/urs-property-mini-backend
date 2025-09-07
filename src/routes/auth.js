const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Hardcoded admin (can be overridden by env)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@test.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

/**
 * POST /api/auth/login
 * body: { email, password }
 * returns: { token }
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
