const express = require('express');
const pool = require('../db');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Parsear campos JSON-as-TEXT del cliente
function parseClient(row) {
  if (!row) return row;
  const parse = (v) => { try { return typeof v === 'string' ? JSON.parse(v) : (v || []); } catch { return []; } };
  return { ...row, custom_types: parse(row.custom_types), custom_angles: parse(row.custom_angles) };
}

// GET all clients for user
router.get('/', optionalAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients WHERE user_id = $1 ORDER BY created_at DESC', [req.user.userId]);
    res.json(result.rows.map(parseClient));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single client
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients WHERE id = $1 AND user_id = $2', [req.params.id, req.user.userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Client not found' });
    res.json(parseClient(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new client
router.post('/', optionalAuth, async (req, res) => {
  const { id, name, industry, description, audience, tone, color, color2, style } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing name' });

  try {
    const clientId = id || `cl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const result = await pool.query(
      'INSERT INTO clients (id, user_id, name, industry, description, audience, tone, color, color2, style) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [clientId, req.user.userId, name, industry || null, description || null, audience || null, tone || null, color || null, color2 || null, style || null]
    );
    res.status(201).json(parseClient(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update client
router.put('/:id', optionalAuth, async (req, res) => {
  const { name, industry, description, audience, tone, color, color2, style, custom_types, custom_angles } = req.body;
  try {
    const stringify = (v) => v !== undefined ? JSON.stringify(v) : null;
    const result = await pool.query(
      `UPDATE clients SET
        name = COALESCE($2, name),
        industry = COALESCE($3, industry),
        description = COALESCE($4, description),
        audience = COALESCE($5, audience),
        tone = COALESCE($6, tone),
        color = COALESCE($7, color),
        color2 = COALESCE($8, color2),
        style = COALESCE($9, style),
        custom_types = COALESCE($10, custom_types),
        custom_angles = COALESCE($11, custom_angles),
        updated_at = NOW()
       WHERE id = $1 AND user_id = $12 RETURNING *`,
      [req.params.id, name, industry, description, audience, tone, color, color2, style,
       custom_types !== undefined ? stringify(custom_types) : null,
       custom_angles !== undefined ? stringify(custom_angles) : null,
       req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Client not found' });
    res.json(parseClient(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE client
router.delete('/:id', optionalAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM clients WHERE id = $1 AND user_id = $2 RETURNING id', [req.params.id, req.user.userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Client not found' });
    res.json({ deleted: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET client docs
router.get('/:id/docs', optionalAuth, async (req, res) => {
  try {
    const client = await pool.query('SELECT id FROM clients WHERE id = $1 AND user_id = $2', [req.params.id, req.user.userId]);
    if (client.rows.length === 0) return res.status(404).json({ error: 'Client not found' });

    const result = await pool.query('SELECT id, client_id, name, mime_type, analysis, position, created_at FROM client_docs WHERE client_id = $1 ORDER BY position', [req.params.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new client doc
router.post('/:id/docs', optionalAuth, async (req, res) => {
  const { name, base64, mimeType, analysis } = req.body;
  if (!name || !base64) return res.status(400).json({ error: 'Missing fields' });

  try {
    const client = await pool.query('SELECT id FROM clients WHERE id = $1 AND user_id = $2', [req.params.id, req.user.userId]);
    if (client.rows.length === 0) return res.status(404).json({ error: 'Client not found' });

    const result = await pool.query(
      'INSERT INTO client_docs (client_id, name, base64, mime_type, analysis, position) VALUES ($1, $2, $3, $4, $5, (SELECT COALESCE(MAX(position), -1) + 1 FROM client_docs WHERE client_id = $1)) RETURNING *',
      [req.params.id, name, base64, mimeType, analysis || '']
    );
    res.status(201).json(parseClient(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE client doc
router.delete('/:id/docs/:docId', optionalAuth, async (req, res) => {
  try {
    const client = await pool.query('SELECT id FROM clients WHERE id = $1 AND user_id = $2', [req.params.id, req.user.userId]);
    if (client.rows.length === 0) return res.status(404).json({ error: 'Client not found' });

    const result = await pool.query('DELETE FROM client_docs WHERE id = $1 AND client_id = $2 RETURNING id', [req.params.docId, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Doc not found' });
    res.json({ deleted: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
