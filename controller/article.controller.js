const {
  model_fetchArticleByID,
  model_patchArticleByID,
} = require("../model/article.model");

exports.controller_fetchArticleByID = (req, res, next) => {
  model_fetchArticleByID(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.controller_patchArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  model_patchArticleByID(article_id, inc_votes)
    .then((updatedArticles) => {
      res.status(201).send({ updatedArticles });
    })
    .catch(next);
};
