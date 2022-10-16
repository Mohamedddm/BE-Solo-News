const { off } = require("../app");
const {
  model_fetchArticleByID,
  model_patchArticleByID,
  model_fetchArticles,
  model_postCommentByID,
} = require("../model/article.model");

const {
  model_fetchCommentsFromArticleByID,
} = require("../model/comment.model.js");

exports.controller_fetchArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  model_fetchArticleByID(article_id)
    .then((article) => {
      res.status(200).send({ article });
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

exports.controller_fetchArticles = (req, res, next) => {
  const { topic } = req.query;
  model_fetchArticles(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.controller_fetchCommentsFromArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  model_fetchCommentsFromArticleByID(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.controller_postCommentByID = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  model_postCommentByID(article_id, body)
    .then(([postedComment]) => {
      res.status(201).send(postedComment);
    })
    .catch(next);
};
