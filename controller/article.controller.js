const { model_fetchArticleByID } = require("../model/article.model");

exports.controller_fetchArticleByID = (req, res, next) => {
  model_fetchArticleByID(req.params.article_id)
    .then((article) => {
      /*if (!article) {
        return Promise.reject({ code: 404 });
      }*/
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
