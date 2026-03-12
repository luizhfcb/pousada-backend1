const Reserva = require('../models/Reserva');

exports.criarReserva = async (req, res) => {
  try {
    const novaReserva = new Reserva(req.body);
    await novaReserva.save();
    res.status(201).json({ mensagem: 'Reserva criada com sucesso!', reserva: novaReserva });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar reserva.', detalhes: erro.message });
  }
};


exports.listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('quarto');
    res.json(reservas);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar reservas.', detalhes: erro.message });
  }
};

exports.atualizarReserva = async (req, res) => {
  try {
    const reservaAtualizada = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!reservaAtualizada) {
      return res.status(404).json({ erro: 'Reserva não encontrada.' });
    }
    res.json({ mensagem: 'Reserva atualizada!', reserva: reservaAtualizada });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar reserva.', detalhes: erro.message });
  }
};

exports.deletarReserva = async (req, res) => {
  try {
    const reservaDeletada = await Reserva.findByIdAndDelete(req.params.id);
    
    if (!reservaDeletada) {
      return res.status(404).json({ erro: 'Reserva não encontrada.' });
    }
    res.json({ mensagem: 'Reserva removida com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar reserva.' });
  }
};