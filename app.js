const express = require("express");
const app = express();
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleInternalErrors,
  handle404Errors,
} = require("./controller/error.controller");
const { controller_fetchTopics } = require("./controller/topic.controller");
const {
  controller_fetchArticleByID,
} = require("./controller/article.controller");

app.use(express.json());

//topics
app.get("/api/topics", controller_fetchTopics);

//articles
app.get("/api/articles/:article_id", controller_fetchArticleByID);

//All other endpoints
app.all("/api/*", handle404Errors);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);

module.exports = app;
