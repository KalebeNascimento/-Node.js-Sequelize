require('dotenv').config();
const express = require('express');
const { Op, ValidationError, UniqueConstraintError } = require('sequelize');
const sequelize = require('./config/db');
const Pessoa = require('./models/pessoa');

const app = express();
app.use(express.json());

// Listar pessoas com filtros, ordenação e paginação
app.get('/pessoas', async (req, res) => {
  try {
    const {
      nome, email, cidade,
      idadeMin, idadeMax,
      orderBy = 'nome', order = 'ASC',
      page = 1, limit = 10,
    } = req.query;

    const camposPermitidos = ['nome', 'email', 'idade', 'cidade', 'createdAt'];

    const where = {};
    if (nome) where.nome = { [Op.iLike]: `%${nome}%` };
    if (email) where.email = { [Op.iLike]: `%${email}%` };
    if (cidade) where.cidade = { [Op.iLike]: `%${cidade}%` };
    if (idadeMin || idadeMax) {
      where.idade = {};
      if (idadeMin) where.idade[Op.gte] = Number(idadeMin);
      if (idadeMax) where.idade[Op.lte] = Number(idadeMax);
    }

    const campo = camposPermitidos.includes(orderBy) ? orderBy : 'nome';
    const direcao = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const pagina = Math.max(1, parseInt(page, 10));
    const tamanho = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const offset = (pagina - 1) * tamanho;

    const { count, rows } = await Pessoa.findAndCountAll({
      where,
      order: [[campo, direcao]],
      limit: tamanho,
      offset,
    });

    res.json({
      total: count,
      pagina,
      limite: tamanho,
      totalPaginas: Math.ceil(count / tamanho),
      dados: rows,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// Buscar pessoa por ID
app.get('/pessoas/:id', async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).json({ erro: 'Pessoa não encontrada' });
    res.json(pessoa);
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// Criar pessoa
app.post('/pessoas', async (req, res) => {
  try {
    const pessoa = await Pessoa.create(req.body);
    res.status(201).json(pessoa);
  } catch (err) {
    if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
      return res.status(400).json({ erro: err.errors.map((e) => e.message) });
    }
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// Atualizar pessoa
app.put('/pessoas/:id', async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).json({ erro: 'Pessoa não encontrada' });
    await pessoa.update(req.body);
    res.json(pessoa);
  } catch (err) {
    if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
      return res.status(400).json({ erro: err.errors.map((e) => e.message) });
    }
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// Remover pessoa
app.delete('/pessoas/:id', async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).json({ erro: 'Pessoa não encontrada' });
    await pessoa.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.error('Falha ao conectar ao banco de dados:', err.message);
  process.exit(1);
});
