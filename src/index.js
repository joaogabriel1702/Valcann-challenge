const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Usuários funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});