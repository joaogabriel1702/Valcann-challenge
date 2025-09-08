# API de Usuários
Uma API RESTful para gerenciamento de usuários, desenvolvida em Node.js com Express.

## Funcionalidades
- Listagem de usuários com paginação
- Busca de usuários por nome ou email
- Filtros por role e status ativo
- Obtenção de usuário por ID
- Respostas padronizadas com códigos HTTP apropriados
- Suporte a CORS

## Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação
Clone o repositório:
```bash
git clone <url-do-repositorio>
cd <nome-do-diretorio>
Instale as dependências:
npm install
```

## Execução
Para iniciar o servidor em modo de desenvolvimento:
```bash
npm run dev
```

## Para iniciar o servidor em modo de produção:
```bash
npm start
O servidor estará disponível em http://localhost:3000
```

## Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
```bash
PORT=3000
Endpoints
GET /users
Retorna uma lista paginada de usuários com opções de filtro.
```

## Parâmetros de consulta:
```bash
page (opcional, padrão: 1) - Número da página

page_size (opcional, padrão: 10, máximo: 50) - Tamanho da página

q (opcional) - Termo de busca (nome ou email)

role (opcional) - Filtro por cargo (manager, analyst, admin, viewer)

is_active (opcional) - Filtro por status (true/false)
```
Exemplos:

```bash
# Listar todos os usuários (paginação padrão)
curl "http://localhost:3000/users"

# Listar segunda página com 5 itens
curl "http://localhost:3000/users?page=2&page_size=5"

# Buscar usuários por termo
curl "http://localhost:3000/users?q=hoffmann"

# Filtrar por role
curl "http://localhost:3000/users?role=manager"

# Filtrar por status ativo
curl "http://localhost:3000/users?is_active=true"

# Combinação de filtros
curl "http://localhost:3000/users?role=analyst&is_active=true&page=1&page_size=20"
GET /users/:id
Retorna um usuário específico pelo ID.
```

# Buscar usuário por ID
```bash
curl "http://localhost:3000/users/1"
```

# Tentativa de buscar usuário inexistente
```bash
curl "http://localhost:3000/users/999"
```

## Estrutura do Projeto
```bash
project-root/
├── index.js          # Ponto de entrada da aplicação
├── package.json      # Dependências e scripts
├── .gitignore        # Arquivos ignorados pelo Git
├── .env              # Variáveis de ambiente (não versionado)
├── routes/
│   └── users.js      # Definição das rotas
├── controllers/
│   └── usersController.js  # Lógica dos endpoints
└── data/
    └── mock-users.json     # Dados dos usuários
```

## Respostas da API
### Sucesso (200)
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total_items": 25,
    "total_pages": 3,
    "has_prev": false,
    "has_next": true
  }
}
```

### Erro (400, 404, 500)
```json
{
  "error": "Mensagem de erro descritiva"
}
```

## Códigos de Status HTTP
200: Sucesso

400: Requisição inválida (parâmetros incorretos)

404: Recurso não encontrado

500: Erro interno do servidor

# Desenvolvimento
Para desenvolvimento com auto-reload, use:
```bash
npm run dev
```

## Tecnologias Utilizadas
Node.js \
Express.js\
CORS middleware

