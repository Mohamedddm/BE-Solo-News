const { model_fetchUsers } = require("../model/user.model.js");

exports.controller_fetchUsers = (req, res, next) => {
  model_fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
