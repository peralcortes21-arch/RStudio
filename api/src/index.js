const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/auth');
const clientsRouter = require('./routes/clients');
const calendarsRouter = require('./routes/calendars');
const postsRouter = require('./routes/posts');
const refsRouter = require('./routes/refs');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configurado para permitir localhost en puerto 80
const corsOptions = {
  origin: ['http://localhost', 'http://localhost:80', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/calendars', calendarsRouter);
app.use('/api/calendars', postsRouter);
app.use('/api/refs', refsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`RStudio API running on http://localhost:${PORT}`);
});
