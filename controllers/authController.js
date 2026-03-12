const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha, cargo } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
      cargo
    });

    await novoUsuario.save();
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao registrar usuário.', detalhes: erro.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ erro: 'Usuário não encontrado.' });
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