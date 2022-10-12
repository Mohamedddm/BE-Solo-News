const db = require("../db/connection.js");

exports.model_fetchUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows: users }) => {
    if (!users) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return users;
  });
};
