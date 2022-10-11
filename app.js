const express = require("express");
const app = express();
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleInternalErrors,
  handle404Errors,
} = require("./controller/error.controller");
const { controller_fetchTopics } = require("./controller/topic.controller");

app.use(express.json());

app.get("/api/topics", controller_fetchTopics);
app.all("/api/*", handle404Errors);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);

module.exports = app;
