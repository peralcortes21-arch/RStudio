const express = require('express');
const pool = require('../db');
const { verifyJWT } = require('../middleware/auth');

const router = express.Router();

// GET all calendars for user
router.get('/', verifyJWT, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, COUNT(p.id) as post_count FROM calendars c
       LEFT JOIN posts p ON c.id = p.calendar_id
       WHERE c.user_id = $1
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single calendar
router.get('/:id', verifyJWT, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM calendars WHERE id = $1 AND user_id = $2', [req.params.id, req.user.userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new calendar
router.post('/', verifyJWT, async (req, res) => {
  const { id, name, description, clientId } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing name' });

  try {
    const calId = id || `cal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const result = await pool.query(
      'INSERT INTO calendars (id, user_id, client_id, name, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [calId, req.user.userId, clientId || null, name, description || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update calendar
router.put('/:id', verifyJWT, async (req, res) => {
  const { name, description, clientId } = req.body;
  try {
    const result = await pool.query(
      'UPDATE calendars SET name = COALESCE($2, name), description = COALESCE($3, description), client_id = COALESCE($4, client_id), updated_at = NOW() WHERE id = $1 AND user_id = $5 RETURNING *',
      [req.params.id, name, description, clientId, req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE calendar (cascade deletes posts)
router.delete('/:id', verifyJWT, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM calendars WHERE id = $1 AND user_id = $2 RETURNING id', [req.params.id, req.user.userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });
    res.json({ deleted: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
