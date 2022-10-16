const db = require("../db/connection.js");

exports.model_fetchCommentsFromArticleByID = (article_id) => {
  return db
    .query(
      "SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id=$1 ORDER BY created_at DESC",
      [article_id]
    )
    .then(({ rows: comments }) => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return comments;
    });
};
