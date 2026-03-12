const Servico = require('../models/Servico');

exports.criarServico = async (req, res) => {
  try {
    const novoServico = new Servico(req.body);
    await novoServico.save();
    res.status(201).json({ mensagem: 'Serviço criado com sucesso!', servico: novoServico });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar serviço.', detalhes: erro.message });
  }
};

exports.listarServicos = async (req, res) => {
  try {
    const servicos = await Servico.find().populate('funcionariosAptos', 'nome email cargo');
    res.json(servicos);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar serviços.' });
  }
};