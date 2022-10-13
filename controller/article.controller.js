const { off } = require("../app");
const {
  model_fetchArticleByID,
  model_patchArticleByID,
  model_fetchArticles,
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

exports.controller_fetchArticles = (req, res, next) => {
  const promiseArray = [];
  const arrayOfArticlesObject = [];
  model_fetchArticles()
    .then((articles) => {
      promiseArray.push(Promise.resolve(articles));
      articles.forEach((article) => {
        promiseArray.push(model_fetchCommentByID(article.article_id));
      });
      return Promise.all(promiseArray);
    })
    .then(([articles, ...comments]) => {
      articles.forEach((article, index) => {
        arrayOfArticlesObject.push({
          article,
          comment_count: comments[index].length,
        });
      });
      res.status(200).send(arrayOfArticlesObject);
    })
    .catch(next);
};
