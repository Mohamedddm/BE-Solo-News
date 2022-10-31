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
  controller_patchArticleByID,
  controller_fetchArticles,
  controller_fetchCommentsFromArticleByID,
  controller_postCommentByID,
} = require("./controller/article.controller");
const { controller_fetchUsers } = require("./controller/user.controller.js");

const cors = require("cors");

app.use(cors());

app.use(express.json());

//topics
app.get("/api/topics", controller_fetchTopics);

//articles
app.get("/api/articles", controller_fetchArticles);
app.get("/api/articles/:article_id", controller_fetchArticleByID);
app.patch("/api/articles/:article_id", controller_patchArticleByID);
app.get(
  "/api/articles/:article_id/comments",
  controller_fetchCommentsFromArticleByID
);
app.post("/api/articles/:article_id/comments", controller_postCommentByID);

//users
app.get("/api/users", controller_fetchUsers);

//general
app.get("/api", (req, res, next) => {
  const data = {
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
    },
    "GET /api/topics": {
      description: "serves an array of all topics",
      queries: [],
      exampleResponse: {
        topics: [{ slug: "football", description: "Footie!" }],
      },
    },
    "GET /api/articles": {
      description: "serves an array of all topics",
      queries: ["author", "topic", "sort_by", "order"],
      exampleResponse: {
        articles: [
          {
            title: "Seafood substitutions are increasing",
            topic: "cooking",
            author: "weegembump",
            body: "Text from the article..",
            created_at: 1527695953341,
          },
        ],
      },
    },
  };

  res.status(200).send(data);
});

//All other endpoints
app.all("/api/*", handle404Errors);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);

module.exports = app;
