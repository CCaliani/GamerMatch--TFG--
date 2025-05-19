const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secreto';

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  // req.user contiene los datos del usuario autenticado

});

module.exports = auth;
