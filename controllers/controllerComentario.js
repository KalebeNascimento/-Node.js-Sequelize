module.exports = {
  async getCreate(req, res) {
    res.render('comentario/comentarioCreate');
  },
  async postCreate(req, res) {
    res.redirect('/home');
  },
  async getList(req, res) {
    res.render('comentario/comentarioList', { comentarios: [] });
  }
};
