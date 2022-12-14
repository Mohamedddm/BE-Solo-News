const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("200: Should return all topics in test db", () => {
    const expectedBody = {
      topics: [
        { slug: "mitch", description: "The man, the Mitch, the legend" },
        { slug: "cats", description: "Not dogs" },
        { slug: "paper", description: "what books are made of" },
      ],
    };

    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(typeof body.topics).toBe("object");
        expect(Array.isArray(body.topics)).toBe(true);
        expect(body.topics).toHaveLength(3);

        body.topics.forEach((topic) => {
          expect(topic).toEqual({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });

        expect(body).toEqual(expectedBody);
      });
  });

  test("404: Invalid endpoint inputted", () => {
    return request(app)
      .get("/api/topicss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Should return specified data", () => {
    const expectedBody = {
      article: {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
        comment_count: 11,
      },
    };
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(Object.keys(body)).toHaveLength(1);
        expect(Object.keys(body.article)).toHaveLength(8);

        expect(body.article).toEqual({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(Number),
        });

        expect(body).toEqual(expectedBody);
      });
  });

  test("400: Should return error message from psql", () => {
    const expectedBody = { msg: "400: Invalid id" };
    return request(app)
      .get("/api/articles/lol")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual(expectedBody);
      });
  });
  test("404: Invalid endpoint inputted", () => {
    const expectedBody = { msg: "Not Found" };
    return request(app)
      .get("/api/articless/1")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual(expectedBody);
      });
  });
  test("404: Invalid, ID does not exist in table", () => {
    const expectedBody = { msg: "Not Found" };
    return request(app)
      .get("/api/articles/999999")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual(expectedBody);
      });
  });
});

describe("GET /api/users", () => {
  test("200: Should return all users in test db", () => {
    const expectedBody = {
      users: [
        {
          username: "butter_bridge",
          name: "jonny",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        },
        {
          username: "icellusedkars",
          name: "sam",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
        },
        {
          username: "rogersop",
          name: "paul",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        },
        {
          username: "lurker",
          name: "do_nothing",
          avatar_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        },
      ],
    };

    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(typeof body.users).toBe("object");
        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users).toHaveLength(4);

        body.users.forEach((user) => {
          expect(user).toEqual({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });

        expect(body).toEqual(expectedBody);
      });
  });

  test("404: Invalid endpoint inputted AND if no users in db", () => {
    return request(app)
      .get("/api/userss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });

  test("404: Invalid endpoint inputted", () => {
    return request(app)
      .get("/api/userss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Should update votes on specific article", () => {
    const expectedBody = {
      updatedArticles: {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 105,
      },
    };

    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 5 })
      .expect(201)
      .then(({ body }) => {
        expect(body.updatedArticles.votes).toBe(105);
        expect(body).toEqual(expectedBody);
      });
  });

  test("404: Invalid endpoint inputted", () => {
    return request(app)
      .patch("/api/articless/1")
      .send({ inc_votes: 5 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });

  test("404: Invalid ID", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 5 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });

  test("400: Invalid parametric endpoint type", () => {
    const expectedBody = { msg: "400: Invalid id" };
    return request(app)
      .patch("/api/articles/lol")
      .send({ inc_votes: 5 })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual(expectedBody);
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Should return all articles in test db", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);

        body.articles.forEach((articleObj) => {
          expect(Object.keys(articleObj)).toHaveLength(8);
          expect(articleObj).toEqual(expect.any(Object));
        });

        expect(body.articles).toHaveLength(12);
      });
  });

  test("404: Invalid endpoint inputted", () => {
    return request(app)
      .get("/api/articless")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("404: Invalid query entered", () => {
    return request(app)
      .get("/api/articles?topic=not_real_topic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("200: topic = cat query should return 1 article", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(1);
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Should return all comments associated with specific article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true);

        body.comments.forEach((comment) => {
          expect(Object.keys(comment)).toHaveLength(5);
          expect(comment).toEqual({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });

  test("404: Invalid endpoint inputted", () => {
    return request(app)
      .get("/api/articles/1/commentss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("404: Invalid article_id", () => {
    return request(app)
      .get("/api/articles/99999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("400: Invalid article_id type", () => {
    return request(app)
      .get("/api/articles/lol/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400: Invalid id");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("200: Should add comment onto comment table", () => {
    const expectedBody = {
      comment_id: 19,
      body: "Hello world",
      article_id: 1,
      author: "butter_bridge",
      votes: 0,
      created_at: "2022-10-14T13:42:38.913Z",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "butter_bridge", body: "Hello world" })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment_id).toBe(19);
        expect(body).toEqual({
          comment_id: 19,
          body: "Hello world",
          article_id: 1,
          author: "butter_bridge",
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });

  test("404: Invalid endpoint inputted", () => {
    return request(app)
      .post("/api/articles/1/commentss")
      .send({ username: "butter_bridge", body: "Hello world" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });

  test("404: Invalid ID", () => {
    return request(app)
      .post("/api/articles/11111/comments")
      .send({ username: "butter_bridge", body: "Hello world" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400: Invalid id");
      });
  });

  test("400: Invalid parametric endpoint type", () => {
    const expectedBody = { msg: "400: Invalid id" };
    return request(app)
      .post("/api/articles/lol/comments")
      .send({ username: "butter_bridge", body: "Hello world" })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual(expectedBody);
      });
  });
});
