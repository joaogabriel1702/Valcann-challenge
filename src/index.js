const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API de Usuários funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});