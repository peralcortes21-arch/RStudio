const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretchangeme');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretchangeme');
      req.user = decoded;
      next();
      return;
    } catch (err) {
      // Token inválido, continúa como anónimo
    }
  }
  // Sin token o token inválido: usar usuario por defecto (id=1)
  req.user = { userId: 1, email: 'demo@app.local', name: 'Usuario' };
  next();
}

module.exports = { verifyJWT, optionalAuth };
