const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const servicoRoutes = require('./routes/servicoRoutes');
require('dotenv').config();

const app = express();


app.use(express.json()); 
app.use(cors()); 
app.use('/api/servicos', servicoRoutes);

const authRoutes = require('./routes/authRoutes');
const quartoRoutes = require('./routes/quartoRoutes');
const reservaRoutes = require('./routes/reservaRoutes')

app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Pousada rodando com sucesso!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/quartos', quartoRoutes);
app.use('/api/reservas', reservaRoutes);

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