# People REST API

API REST para gerenciamento de pessoas, construída com **Node.js + Express + Sequelize + PostgreSQL**.

## Funcionalidades

- CRUD completo de pessoas
- Filtros por nome, email, cidade e faixa etária
- Ordenação por qualquer campo
- Paginação

## Estrutura de arquivos

```
├── config/
│   └── db.js          # Conexão Sequelize/PostgreSQL
├── models/
│   └── pessoa.js      # Model Pessoa
├── package.json
└── app.js             # Rotas e servidor
```

## Configuração

```bash
cp .env.example .env
# Edite .env com suas credenciais do PostgreSQL
npm install
npm run dev
```

## Variáveis de ambiente (.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=people_db
DB_USER=postgres
DB_PASS=sua_senha
PORT=3000
```

## Endpoints

| Método | Rota          | Descrição                    |
|--------|---------------|------------------------------|
| GET    | /pessoas      | Listar pessoas (com filtros) |
| GET    | /pessoas/:id  | Buscar pessoa por ID         |
| POST   | /pessoas      | Criar pessoa                 |
| PUT    | /pessoas/:id  | Atualizar pessoa             |
| DELETE | /pessoas/:id  | Remover pessoa               |

## Query Parameters (GET /pessoas)

| Parâmetro | Tipo   | Descrição                           |
|-----------|--------|-------------------------------------|
| nome      | string | Filtro parcial por nome (iLike)     |
| email     | string | Filtro parcial por email            |
| cidade    | string | Filtro parcial por cidade           |
| idadeMin  | number | Idade mínima                        |
| idadeMax  | number | Idade máxima                        |
| orderBy   | string | Campo para ordenar (padrão: nome)   |
| order     | string | ASC ou DESC (padrão: ASC)           |
| page      | number | Página (padrão: 1)                  |
| limit     | number | Itens por página (padrão: 10, máx: 100) |

## Exemplos de requisição

```bash
# Criar pessoa
curl -X POST http://localhost:3000/pessoas \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@email.com","idade":30,"cidade":"São Paulo"}'

# Listar com filtros e paginação
curl "http://localhost:3000/pessoas?cidade=São Paulo&idadeMin=25&orderBy=nome&page=1&limit=5"

# Buscar por ID
curl http://localhost:3000/pessoas/1

# Atualizar
curl -X PUT http://localhost:3000/pessoas/1 \
  -H "Content-Type: application/json" \
  -d '{"cidade":"Curitiba"}'

# Remover
curl -X DELETE http://localhost:3000/pessoas/1
```

## Modelo de Pessoa

| Campo     | Tipo    | Obrigatório | Descrição            |
|-----------|---------|-------------|----------------------|
| id        | integer | auto        | Chave primária       |
| nome      | string  | sim         | Nome completo        |
| email     | string  | sim         | E-mail único         |
| idade     | integer | sim         | Idade (0-150)        |
| cidade    | string  | não         | Cidade de residência |
| createdAt | date    | auto        | Data de criação      |
| updatedAt | date    | auto        | Data de atualização  |
