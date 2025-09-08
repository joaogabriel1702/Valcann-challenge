const usersData = require('../data/mock-users.json');

const getUsers = (req, res) => {
  try {

    let { page = 1, page_size = 10, q, role, is_active } = req.query;

    page = parseInt(page);
    page_size = parseInt(page_size);

    if (page_size > 50) {
      return res.status(400).json({
        error: 'O tamanho da página não pode exceder 50'
      });
    }

    let filteredUsers = [...usersData];

    if (q) {
      const searchTerm = q.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    }

    if (role) {
      filteredUsers = filteredUsers.filter(user =>
        user.role === role
      );
    }

    if (is_active !== undefined) {
      const isActiveBool = is_active === 'true';
      filteredUsers = filteredUsers.filter(user =>
        user.is_active === isActiveBool
      );
    }

    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / page_size);

    if (page < 1 || (page > totalPages && totalPages > 0)) {
      return res.status(400).json({
        error: 'Página inválida'
      });
    }

    const startIndex = (page - 1) * page_size;
    const endIndex = Math.min(startIndex + page_size, totalItems);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
      data: paginatedUsers,
      pagination: {
        page,
        page_size,
        total_items: totalItems,
        total_pages: totalPages,
        has_prev: page > 1,
        has_next: page < totalPages
      }
    });

  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

const getUserById = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        error: 'ID deve ser um número válido'
      });
    }
    
    const user = usersData.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }
    
    res.json(user);
    
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  getUsers,
  getUserById
};