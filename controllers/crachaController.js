const Cracha = require('../models/Cracha');

exports.listarCrachas = async (req, res) => {
  try {
    const crachas = await Cracha.find()
      .populate('usuario', 'nome cargo email')
      .sort({ dataEmissao: -1 });

    res.json(crachas);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar crach\u00e1s.', detalhes: erro.message });
  }
};

exports.criarCracha = async (req, res) => {
  try {
    const novoCracha = new Cracha(req.body);
    await novoCracha.save();
    res.status(201).json(novoCracha);
  } catch (erro) {
    if (erro.code === 11000) {
      return res.status(400).json({ erro: 'Bloqueio 1:1 - Este usu\u00e1rio j\u00e1 possui um crach\u00e1 ativo!' });
    }

    res.status(500).json({ erro: 'Erro ao cadastrar crach\u00e1.', detalhes: erro.message });
  }
};
