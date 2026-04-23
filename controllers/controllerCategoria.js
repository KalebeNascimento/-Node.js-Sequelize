const db = require('../config/db_sequelize');

module.exports = {
  async getCreate(req, res) {
    res.render('categoria/categoriaCreate');
  },
  async postCreate(req, res) {
    db.Categoria.create(req.body)
      .then(() => { res.redirect('/home'); })
      .catch(err => { console.log(err); });
  },
  async getList(req, res) {
    db.Categoria.findAll()
      .then(categorias => {
        res.render('categoria/categoriaList',
          { categorias: categorias.map(catg => catg.toJSON()) });
      })
      .catch(err => { console.log(err); });
  },
  async getUpdate(req, res) {
    await db.Categoria.findByPk(req.params.id)
      .then(categoria => res.render('categoria/categoriaUpdate',
        { categoria: categoria.dataValues }))
      .catch(err => { console.log(err); });
  },
  async postUpdate(req, res) {
    await db.Categoria.update(req.body, { where: { id: req.body.id } })
      .then(res.redirect('/categoriaList'))
      .catch(err => { console.log(err); });
  },
  async getDelete(req, res) {
    await db.Categoria.destroy({ where: { id: req.params.id } })
      .then(res.redirect('/categoriaList'))
      .catch(err => { console.log(err); });
  }
};
