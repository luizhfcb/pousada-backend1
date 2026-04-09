module.exports = function requireAdmin(req, res, next) {
  if (req.usuario?.cargo !== 'admin') {
    return res.status(403).json({ erro: 'Acesso restrito a administradores.' });
  }

  next();
};
