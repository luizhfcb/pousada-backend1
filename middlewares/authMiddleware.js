const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const tokenLimpo = token.replace('Bearer ', '');

    const decodificado = jwt.verify(tokenLimpo, process.env.JWT_SECRET);

    req.usuario = decodificado;

    next();
    
  } catch (erro) {
    res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};