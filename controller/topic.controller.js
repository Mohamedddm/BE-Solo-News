const { model_fetchTopics } = require("../model/topic.model");

exports.controller_fetchTopics = (req, res, next) => {
  model_fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
