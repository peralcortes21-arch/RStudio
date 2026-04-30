const express = require('express');
const pool = require('../db');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET all posts in calendar
router.get('/:calId/posts', optionalAuth, async (req, res) => {
  try {
    const cal = await pool.query('SELECT id FROM calendars WHERE id = $1 AND user_id = $2', [req.params.calId, req.user.userId]);
    if (cal.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });

    const result = await pool.query('SELECT * FROM posts WHERE calendar_id = $1 ORDER BY position', [req.params.calId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single post
router.get('/:calId/posts/:postId', optionalAuth, async (req, res) => {
  try {
    const cal = await pool.query('SELECT id FROM calendars WHERE id = $1 AND user_id = $2', [req.params.calId, req.user.userId]);
    if (cal.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });

    const result = await pool.query('SELECT * FROM posts WHERE id = $1 AND calendar_id = $2', [req.params.postId, req.params.calId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new post
router.post('/:calId/posts', optionalAuth, async (req, res) => {
  const { id, position, hour, angle, type, hook, sub_title, body, cta, visual, prompt, img_src } = req.body;
  if (!hook) return res.status(400).json({ error: 'Missing hook' });

  try {
    const cal = await pool.query('SELECT id FROM calendars WHERE id = $1 AND user_id = $2', [req.params.calId, req.user.userId]);
    if (cal.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });

    const postId = id || `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const pos = position ?? (await pool.query('SELECT COALESCE(MAX(position), -1) + 1 as pos FROM posts WHERE calendar_id = $1', [req.params.calId])).rows[0].pos;

    const result = await pool.query(
      'INSERT INTO posts (id, calendar_id, position, hour, angle, type, hook, sub_title, body, cta, visual, prompt, img_src) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [postId, req.params.calId, pos, hour || '10:00', angle || 'POST', type || null, hook, sub_title || '', body || '', cta || '', visual || '', prompt || '', img_src || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update post
router.put('/:calId/posts/:postId', optionalAuth, async (req, res) => {
  const { hour, angle, type, hook, sub_title, body, cta, visual, prompt, img_src } = req.body;
  try {
    const cal = await pool.query('SELECT id FROM calendars WHERE id = $1 AND user_id = $2', [req.params.calId, req.user.userId]);
    if (cal.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });

    const result = await pool.query(
      'UPDATE posts SET hour = COALESCE($3, hour), angle = COALESCE($4, angle), type = COALESCE($5, type), hook = COALESCE($6, hook), sub_title = COALESCE($7, sub_title), body = COALESCE($8, body), cta = COALESCE($9, cta), visual = COALESCE($10, visual), prompt = COALESCE($11, prompt), img_src = COALESCE($12, img_src), updated_at = NOW() WHERE id = $1 AND calendar_id = $2 RETURNING *',
      [req.params.postId, req.params.calId, hour, angle, type, hook, sub_title, body, cta, visual, prompt, img_src]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE post
router.delete('/:calId/posts/:postId', optionalAuth, async (req, res) => {
  try {
    const cal = await pool.query('SELECT id FROM calendars WHERE id = $1 AND user_id = $2', [req.params.calId, req.user.userId]);
    if (cal.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });

    const result = await pool.query('DELETE FROM posts WHERE id = $1 AND calendar_id = $2 RETURNING id', [req.params.postId, req.params.calId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ deleted: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT bulk upsert posts (para saveCalWithAI)
router.put('/:calId/posts/bulk', optionalAuth, async (req, res) => {
  const { posts } = req.body;
  if (!Array.isArray(posts)) return res.status(400).json({ error: 'Expected posts array' });

  try {
    const cal = await pool.query('SELECT id FROM calendars WHERE id = $1 AND user_id = $2', [req.params.calId, req.user.userId]);
    if (cal.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });

    const inserted = [];
    for (const p of posts) {
      const postId = p.id || `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const result = await pool.query(
        `INSERT INTO posts (id, calendar_id, position, hour, angle, type, hook, sub_title, body, cta, visual, prompt, img_src)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (id) DO UPDATE SET hour = EXCLUDED.hour, angle = EXCLUDED.angle, type = EXCLUDED.type, hook = EXCLUDED.hook,
                                        sub_title = EXCLUDED.sub_title, body = EXCLUDED.body, cta = EXCLUDED.cta, visual = EXCLUDED.visual,
                                        prompt = EXCLUDED.prompt, img_src = EXCLUDED.img_src, updated_at = NOW()
         RETURNING *`,
        [postId, req.params.calId, p.position ?? 0, p.hour || '10:00', p.angle || 'POST', p.type || null, p.hook, p.sub_title || '', p.body || '', p.cta || '', p.visual || '', p.prompt || '', p.img_src || null]
      );
      inserted.push(result.rows[0]);
    }
    res.json(inserted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
