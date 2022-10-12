const { model_fetchCommentByID } = require("../model/comment.model.js");

exports.controller_fetchCommentByID = (req, res, next) => {
  const { article_id } = req.params;
  return model_fetchCommentByID(article_id);
};
