const express = require('express');
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/categories
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT category_id, name FROM categories ORDER BY name');
    // Return just the names for frontend compatibility
    const categories = result.rows.map(row => row.name);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

module.exports = router;