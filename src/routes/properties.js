const express = require('express');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/properties → fetch all properties
router.get('/', async (req, res) => {
  try {
    const { q, minPrice, maxPrice } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } }
      ];
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const items = await Property.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/properties/:id → fetch details of a property
router.get('/:id', async (req, res) => {
  try {
    const item = await Property.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: 'Invalid id' });
  }
});

// POST /api/properties → add a new property (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const created = await Property.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: 'Validation error', error: e.message });
  }
});

module.exports = router;
