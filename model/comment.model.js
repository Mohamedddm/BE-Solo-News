const db = require("../db/connection.js");

exports.model_fetchCommentByID = (article_id) => {
  return db
    .query("SELECT * FROM comments WHERE article_id=$1;", [article_id])
    .then(({ rows: comments }) => {
      return comments;
    });
};
