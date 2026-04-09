const Usuario = require('../models/Usuario');
const Cracha = require('../models/Cracha');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function sanitizeUser(usuario) {
  if (!usuario) {
    return null;
  }

  const userData =
    typeof usuario.toObject === 'function' ? usuario.toObject() : { ...usuario };

  delete userData.senha;

  return userData;
}

async function buildHashedPassword(senha) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(senha, salt);
}

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha, cargo } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'E-mail j\u00e1 cadastrado.' });
    }

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: await buildHashedPassword(senha),
      cargo,
    });

    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usu\u00e1rio cadastrado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao registrar usu\u00e1rio.', detalhes: erro.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ erro: 'Usu\u00e1rio n\u00e3o encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ erro: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: usuario._id, cargo: usuario.cargo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ mensagem: 'Login realizado com sucesso!', token });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao fazer login.', detalhes: erro.message });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-senha');
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar funcion\u00e1rios.', detalhes: erro.message });
  }
};

exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, cargo } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'E-mail j\u00e1 cadastrado.' });
    }

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: await buildHashedPassword(senha),
      cargo,
    });

    await novoUsuario.save();

    res.status(201).json({
      mensagem: 'Funcion\u00e1rio cadastrado com sucesso!',
      usuario: sanitizeUser(novoUsuario),
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar funcion\u00e1rio.', detalhes: erro.message });
  }
};

exports.atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, cargo } = req.body;

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nome, email, cargo },
      { new: true, runValidators: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ erro: 'Funcion\u00e1rio n\u00e3o encontrado.' });
    }

    res.json({
      mensagem: 'Funcion\u00e1rio atualizado com sucesso!',
      usuario: sanitizeUser(usuarioAtualizado),
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar funcion\u00e1rio.', detalhes: erro.message });
  }
};

exports.deletarUsuario = async (req, res) => {
  try {
    const usuarioRemovido = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuarioRemovido) {
      return res.status(404).json({ erro: 'Funcion\u00e1rio n\u00e3o encontrado.' });
    }

    await Cracha.deleteOne({ usuario: req.params.id });

    res.json({ mensagem: 'Funcion\u00e1rio removido com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao remover funcion\u00e1rio.', detalhes: erro.message });
  }
};
