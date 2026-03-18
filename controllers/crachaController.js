const Cracha = require('../models/Cracha');

exports.criarCracha = async (req, res) => {
  try {
    const novoCracha = new Cracha(req.body);
    await novoCracha.save();
    res.status(201).json(novoCracha);
  } catch (erro) {
    
    if (erro.code === 11000) {
      return res.status(400).json({ erro: 'Bloqueio 1:1 - Este usuário já possui um crachá ativo!' });
    }
    res.status(500).json({ erro: 'Erro ao cadastrar crachá.', detalhes: erro.message });
  }
};