const express = require('express');
const pool = require('../db');
const { verifyJWT } = require('../middleware/auth');

const router = express.Router();

// GET all refs for user (sin base64 para performance)
router.get('/', verifyJWT, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, user_id, name, mime_type, analysis, tags, created_at FROM refs WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single ref (con base64)
router.get('/:id', verifyJWT, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM refs WHERE id = $1 AND user_id = $2', [req.params.id, req.user.userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ref not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new ref
router.post('/', verifyJWT, async (req, res) => {
  const { id, name, base64, mimeType, analysis, tags } = req.body;
  if (!name || !base64) return res.status(400).json({ error: 'Missing fields' });

  try {
    const refId = id || `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const result = await pool.query(
      'INSERT INTO refs (id, user_id, name, base64, mime_type, analysis, tags) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [refId, req.user.userId, name, base64, mimeType, analysis || '', tags || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE ref
router.delete('/:id', verifyJWT, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM refs WHERE id = $1 AND user_id = $2 RETURNING id', [req.params.id, req.user.userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ref not found' });
    res.json({ deleted: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
