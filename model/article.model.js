const db = require("../db/connection.js");

exports.model_fetchArticleByID = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows: [article] }) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return article;
    });
};

exports.model_patchArticleByID = (article_id, inc_votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id=$2 RETURNING *;",
      [inc_votes, article_id]
    )
    .then(({ rows: article }) => {
      return article[0];
    });
};
