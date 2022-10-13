const db = require("../db/connection.js");

exports.model_fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows: topics }) => {
    if (topics.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return topics;
  });
};
