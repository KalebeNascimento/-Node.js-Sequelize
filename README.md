# People REST API

API REST para gerenciamento de pessoas, construída com **Node.js + Express + Sequelize + PostgreSQL**.

## Funcionalidades

- CRUD completo de pessoas
- Filtros por nome, email, cidade e faixa etária
- Ordenação por qualquer campo
- Paginação

## Estrutura de arquivos

```
src/
├── config/
│   └── database.js        # Conexão Sequelize/PostgreSQL
├── models/
│   └── Person.js          # Model Pessoa
├── controllers/
│   └── personController.js # Lógica das rotas
├── routes/
│   └── personRoutes.js    # Definição das rotas
├── middlewares/
│   └── errorHandler.js    # Tratamento de erros
└── index.js               # Ponto de entrada
```

## Configuração

```bash
cp .env.example .env
# Edite .env com suas credenciais do PostgreSQL
npm install
npm run dev
```

## Endpoints

| Método | Rota              | Descrição                   |
|--------|-------------------|-----------------------------|
| GET    | /api/pessoas      | Listar pessoas (com filtros)|
| GET    | /api/pessoas/:id  | Buscar pessoa por ID        |
| POST   | /api/pessoas      | Criar pessoa                |
| PUT    | /api/pessoas/:id  | Atualizar pessoa            |
| DELETE | /api/pessoas/:id  | Remover pessoa              |

## Query Parameters (GET /api/pessoas)

| Parâmetro | Tipo   | Descrição                          |
|-----------|--------|------------------------------------|
| nome      | string | Filtro parcial por nome (iLike)    |
| email     | string | Filtro parcial por email           |
| cidade    | string | Filtro parcial por cidade          |
| idadeMin  | number | Idade mínima                       |
| idadeMax  | number | Idade máxima                       |
| orderBy   | string | Campo para ordenar (padrão: nome)  |
| order     | string | ASC ou DESC (padrão: ASC)          |
| page      | number | Página (padrão: 1)                 |
| limit     | number | Itens por página (padrão: 10, máx: 100) |

## Exemplo de requisição

```bash
# Criar pessoa
curl -X POST http://localhost:3000/api/pessoas \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@email.com","idade":30,"cidade":"São Paulo"}'

# Listar com filtros e paginação
curl "http://localhost:3000/api/pessoas?cidade=São Paulo&idadeMin=25&orderBy=nome&page=1&limit=5"
```

## Modelo de Pessoa

| Campo     | Tipo    | Obrigatório | Descrição           |
|-----------|---------|-------------|---------------------|
| id        | integer | auto        | Chave primária      |
| nome      | string  | sim         | Nome completo       |
| email     | string  | sim         | E-mail único        |
| idade     | integer | sim         | Idade (0-150)       |
| cidade    | string  | não         | Cidade de residência|
| createdAt | date    | auto        | Data de criação     |
| updatedAt | date    | auto        | Data de atualização |
