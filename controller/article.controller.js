const { model_fetchArticleByID } = require("../model/article.model");

exports.controller_fetchArticleByID = (req, res, next) => {
  model_fetchArticleByID(req.params.article_id).then((article) => {
    res.status(200).send({ article });
  });
};
