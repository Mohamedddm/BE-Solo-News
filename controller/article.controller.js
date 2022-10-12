const {
  model_fetchArticleByID,
  model_patchArticleByID,
} = require("../model/article.model");

const { model_fetchCommentByID } = require("../model/comment.model.js");

exports.controller_fetchArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([
    model_fetchArticleByID(article_id),
    model_fetchCommentByID(article_id),
  ])
    .then(([article, comment_count]) => {
      res.status(200).send({ article, comment_count: comment_count.length });
    })
    .catch(next);
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
