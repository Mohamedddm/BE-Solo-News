const db = require("../db/connection.js");

exports.model_fetchArticleByID = (article_id) => {
  return db
    .query(
      "SELECT articles.*, COUNT(*)::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id=$1 GROUP BY articles.article_id",
      [article_id]
    )
    .then(({ rows: [articles] }) => {
      if (!articles) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return articles;
    });
};

exports.model_patchArticleByID = (article_id, inc_votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id=$2 RETURNING *;",
      [inc_votes, article_id]
    )
    .then(({ rows: [article] }) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return article;
    });
};

exports.model_fetchArticles = () => {
  return db
    .query(
      "SELECT articles.*, COUNT(comments.*)::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id"
    )
    .then(({ rows: articles }) => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return articles;
    });
};
