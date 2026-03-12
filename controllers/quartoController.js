const Quarto = require('../models/Quarto');

exports.criarQuarto = async (req, res) => {
  try {
    const novoQuarto = new Quarto(req.body);
    await novoQuarto.save();
    res.status(201).json({ mensagem: 'Quarto criado com sucesso!', quarto: novoQuarto });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar quarto.', detalhes: erro.message });
  }
};

exports.listarQuartos = async (req, res) => {
  try {
    const quartos = await Quarto.find();
    res.json(quartos);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar quartos.' });
  }
};

exports.atualizarQuarto = async (req, res) => {
  try {
    const quartoAtualizado = await Quarto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!quartoAtualizado) {
      return res.status(404).json({ erro: 'Quarto não encontrado.' });
    }
    res.json({ mensagem: 'Quarto atualizado!', quarto: quartoAtualizado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar quarto.', detalhes: erro.message });
  }
};


exports.deletarQuarto = async (req, res) => {
  try {
    const quartoDeletado = await Quarto.findByIdAndDelete(req.params.id);
    
    if (!quartoDeletado) {
      return res.status(404).json({ erro: 'Quarto não encontrado.' });
    }
    res.json({ mensagem: 'Quarto removido com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar quarto.' });
  }
};