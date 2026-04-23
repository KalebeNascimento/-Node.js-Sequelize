# Sistema de Controle de Receitas

Aplicação web MVC construída com **Node.js + Express + Sequelize + PostgreSQL + Handlebars**, com CRUD completo de Usuários, Categorias e Receitas. Inclui também uma REST API para gerenciamento de Pessoas.

## Estrutura de arquivos

```
├── config/
│   ├── db.js                    # Conexão Sequelize para REST API (Pessoa)
│   └── db_sequelize.js          # Conexão Sequelize para MVC (Usuario, Categoria, Receita)
├── controllers/
│   ├── controllerCategoria.js
│   ├── controllerComentario.js
│   ├── controllerReceita.js
│   └── controllerUsuario.js
├── models/
│   ├── pessoa.js                # Model REST API
│   └── relational/
│       ├── categoria.js
│       ├── receita.js
│       └── usuario.js
├── routers/
│   └── route.js                 # Rotas MVC
├── views/
│   ├── layouts/
│   │   └── main.handlebars      # Layout com menu de navegação
│   ├── categoria/
│   │   ├── categoriaCreate.handlebars
│   │   ├── categoriaList.handlebars
│   │   └── categoriaUpdate.handlebars
│   ├── receita/
│   │   ├── receitaCreate.handlebars
│   │   ├── receitaList.handlebars
│   │   └── receitaUpdate.handlebars
│   ├── usuario/
│   │   ├── login.handlebars
│   │   ├── usuarioCreate.handlebars
│   │   ├── usuarioList.handlebars
│   │   └── usuarioUpdate.handlebars
│   └── home.handlebars
├── .env.example
├── app.js
└── package.json
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

## Rotas MVC

| Método | Rota                   | Descrição                  |
|--------|------------------------|----------------------------|
| GET    | /                      | Tela de login              |
| POST   | /login                 | Autenticar usuário         |
| GET    | /home                  | Página inicial             |
| GET    | /usuarioCreate         | Formulário de cadastro     |
| POST   | /usuarioCreate         | Criar usuário              |
| GET    | /usuarioList           | Listar usuários            |
| GET    | /usuarioUpdate/:id     | Formulário de edição       |
| POST   | /usuarioUpdate         | Atualizar usuário          |
| GET    | /usuarioDelete/:id     | Remover usuário            |
| GET    | /categoriaCreate       | Formulário de cadastro     |
| POST   | /categoriaCreate       | Criar categoria            |
| GET    | /categoriaList         | Listar categorias          |
| GET    | /categoriaUpdate/:id   | Formulário de edição       |
| POST   | /categoriaUpdate       | Atualizar categoria        |
| GET    | /categoriaDelete/:id   | Remover categoria          |
| GET    | /receitaCreate         | Formulário de cadastro     |
| POST   | /receitaCreate         | Criar receita              |
| GET    | /receitaList           | Listar receitas            |
| GET    | /receitaUpdate/:id     | Formulário de edição       |
| POST   | /receitaUpdate         | Atualizar receita          |
| GET    | /receitaDelete/:id     | Remover receita            |

## REST API — Pessoas

| Método | Rota              | Descrição                    |
|--------|-------------------|------------------------------|
| GET    | /api/pessoas      | Listar pessoas (com filtros) |
| GET    | /api/pessoas/:id  | Buscar pessoa por ID         |
| POST   | /api/pessoas      | Criar pessoa                 |
| PUT    | /api/pessoas/:id  | Atualizar pessoa             |
| DELETE | /api/pessoas/:id  | Remover pessoa               |

### Query Parameters (GET /api/pessoas)

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

## Relacionamentos

- **Categoria** tem muitas **Receitas** (1:N)
- Chave estrangeira: `categoriaId` na tabela `receitas`
- `onDelete: NO ACTION` — impede exclusão de categoria com receitas vinculadas

## Modelos

### Usuario
| Campo | Tipo    | Obrigatório |
|-------|---------|-------------|
| id    | integer | auto        |
| login | string  | sim         |
| senha | string  | sim         |
| tipo  | integer | sim         |

### Categoria
| Campo | Tipo    | Obrigatório |
|-------|---------|-------------|
| id    | integer | auto        |
| nome  | string  | sim         |

### Receita
| Campo        | Tipo    | Obrigatório |
|--------------|---------|-------------|
| id           | integer | auto        |
| nome         | string  | sim         |
| ingredientes | string  | sim         |
| preparo      | string  | sim         |
| categoriaId  | integer | sim         |

### Pessoa (REST API)
| Campo     | Tipo    | Obrigatório |
|-----------|---------|-------------|
| id        | integer | auto        |
| nome      | string  | sim         |
| email     | string  | sim (único) |
| idade     | integer | sim         |
| cidade    | string  | não         |
