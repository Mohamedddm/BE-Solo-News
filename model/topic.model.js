const db = require("../db/connection.js");

exports.model_fetchTopics = () => {
  console.log(process.env.PGDATABASE);
  return db
    .query("SELECT * FROM topics;")
    .then(({ rows: topics }) => {
      return topics;
    })
    .catch((err) => {
      console.log(err);
    });
};
