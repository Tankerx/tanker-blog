'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/user','user.getAll');
  app.post('/userAdd','user.create');
  app.post('/userDelete','user.delete');
  app.post('/userUpdate', 'user.update')
  app.post('/articleSubmit', 'article.submit')
  app.post('/articleUpdate', 'article.update')
  app.post('/articleDelete', 'article.delete')
  app.get('/getArticleList', 'article.getAllArticle');
  app.get('/getOneArticle', 'article.getOne')
  app.post('/loginValidate','login.validate')
};
