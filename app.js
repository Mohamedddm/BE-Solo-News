const express = require("express");
const app = express();
//const { handlePsqlError } = require("./controller/error.controller");
const { controller_fetchTopics } = require("./controller/topic.controller");

//app.use(express.json());
app.get("/api/topics", controller_fetchTopics);

//app.use(handlePsqlError);

module.exports = app;
