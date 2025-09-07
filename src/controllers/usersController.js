const usersData = require('../data/mock-users.json');

const getUsers = (req, res) => {
  // Implementaremos a lógica de paginação e filtros aqui
  res.json(usersData);
};

const getUserById = (req, res) => {
  const user = usersData.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.json(user);
};

module.exports = {
  getUsers,
  getUserById
};