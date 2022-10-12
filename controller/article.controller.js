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
    .then((lol) => {
      res.status(200).send({ article: lol[0], comment_count: lol[1].length });
      //console.log({ article: lol[0], comment_count: lol[1].length });
    })
    .catch(next);
  /* model_fetchArticleByID(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });*/
  //controller_fetchCommentByID(req, res, next);
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
