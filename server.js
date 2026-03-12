const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json()); 
app.use(cors()); 

// IMPORTAR AS ROTAS (Adicione esta linha)
const authRoutes = require('./routes/authRoutes');
const quartoRoutes = require('./routes/quartoRoutes');
const reservaRoutes = require('./routes/reservaRoutes')

// Rota de teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Pousada rodando com sucesso!' });
});

// USAR AS ROTAS (Adicione esta linha)
app.use('/api/auth', authRoutes);
app.use('/api/quartos', quartoRoutes);
app.use('/api/reservas', reservaRoutes);

// Conexão com o Banco de Dados e Inicialização do Servidor
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err);
  });