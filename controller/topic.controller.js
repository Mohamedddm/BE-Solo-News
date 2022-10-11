const { model_fetchTopics } = require("../model/topic.model");

exports.controller_fetchTopics = (req, res, next) => {
  model_fetchTopics().then((data) => {
    //res.status(200).send();
    //console.log(})
    res.status(200).send({ topics: data });
  });
};
