const { Op } = require('sequelize');
const Person = require('../models/Person');

const ALLOWED_ORDER_FIELDS = ['nome', 'email', 'idade', 'cidade', 'createdAt'];

async function list(req, res, next) {
  try {
    const {
      nome, email, cidade,
      idadeMin, idadeMax,
      orderBy = 'nome', order = 'ASC',
      page = 1, limit = 10,
    } = req.query;

    const where = {};
    if (nome) where.nome = { [Op.iLike]: `%${nome}%` };
    if (email) where.email = { [Op.iLike]: `%${email}%` };
    if (cidade) where.cidade = { [Op.iLike]: `%${cidade}%` };
    if (idadeMin || idadeMax) {
      where.idade = {};
      if (idadeMin) where.idade[Op.gte] = Number(idadeMin);
      if (idadeMax) where.idade[Op.lte] = Number(idadeMax);
    }

    const sortField = ALLOWED_ORDER_FIELDS.includes(orderBy) ? orderBy : 'nome';
    const sortDir = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Person.findAndCountAll({
      where,
      order: [[sortField, sortDir]],
      limit: pageSize,
      offset,
    });

    res.json({
      total: count,
      page: pageNum,
      limit: pageSize,
      totalPages: Math.ceil(count / pageSize),
      data: rows,
    });
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const person = await Person.findByPk(req.params.id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    res.json(person);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const person = await Person.create(req.body);
    res.status(201).json(person);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const person = await Person.findByPk(req.params.id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    await person.update(req.body);
    res.json(person);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const person = await Person.findByPk(req.params.id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    await person.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, update, remove };
