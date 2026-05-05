const express = require('express');
const router = express.Router();

// Proxy para Anthropic Claude — evita CORS en el browser
router.post('/claude', async (req, res) => {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'CLAUDE_API_KEY no configurada en el servidor' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Claude proxy error:', err);
    res.status(500).json({ error: 'Error al conectar con Claude API' });
  }
});

// Proxy para KIE.AI — evita posibles restricciones CORS
router.post('/kie/messages', async (req, res) => {
  const apiKey = process.env.KIE_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'KIE_API_KEY no configurada en el servidor' });

  try {
    const response = await fetch('https://api.kie.ai/claude/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('KIE proxy error:', err);
    res.status(500).json({ error: 'Error al conectar con KIE API' });
  }
});

router.post('/kie/image', async (req, res) => {
  const apiKey = process.env.KIE_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'KIE_API_KEY no configurada en el servidor' });

  try {
    const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('KIE image proxy error:', err);
    res.status(500).json({ error: 'Error al conectar con KIE imagen API' });
  }
});

router.get('/kie/image/status', async (req, res) => {
  const apiKey = process.env.KIE_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'KIE_API_KEY no configurada en el servidor' });

  try {
    const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${req.query.taskId}`, {
      headers: { 'Authorization': 'Bearer ' + apiKey }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('KIE status proxy error:', err);
    res.status(500).json({ error: 'Error al verificar estado de imagen' });
  }
});

module.exports = router;
