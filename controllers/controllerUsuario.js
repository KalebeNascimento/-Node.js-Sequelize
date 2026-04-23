const db = require('../config/db_sequelize');

module.exports = {
  async getLogin(req, res) {
    res.render('usuario/login');
  },
  async postLogin(req, res) {
    db.Usuario.findOne({ where: { login: req.body.login, senha: req.body.senha } })
      .then(usuario => {
        if (usuario) res.redirect('/home');
        else res.render('usuario/login', { erro: 'Login ou senha inválidos' });
      })
      .catch(err => { console.log(err); });
  },
  async getCreate(req, res) {
    res.render('usuario/usuarioCreate');
  },
  async postCreate(req, res) {
    db.Usuario.create(req.body)
      .then(() => { res.redirect('/home'); })
      .catch(err => { console.log(err); });
  },
  async getList(req, res) {
    db.Usuario.findAll()
      .then(usuarios => {
        res.render('usuario/usuarioList',
          { usuarios: usuarios.map(u => u.toJSON()) });
      })
      .catch(err => { console.log(err); });
  },
  async getUpdate(req, res) {
    await db.Usuario.findByPk(req.params.id)
      .then(usuario => res.render('usuario/usuarioUpdate', { usuario: usuario.dataValues }))
      .catch(err => { console.log(err); });
  },
  async postUpdate(req, res) {
    await db.Usuario.update(req.body, { where: { id: req.body.id } })
      .then(res.redirect('/usuarioList'))
      .catch(err => { console.log(err); });
  },
  async getDelete(req, res) {
    await db.Usuario.destroy({ where: { id: req.params.id } })
      .then(res.redirect('/usuarioList'))
      .catch(err => { console.log(err); });
  }
};
